"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { ADMIN_DASHBOARD_CONTENT } from "@/constants/admin";
import {
  createAdminService,
  deleteAdminService,
  getCategories,
  listAdminServices,
  updateAdminService,
} from "@/shared/api";
import { cn } from "@/lib/utils";
import type { AdminService, AdminServicePayload } from "@/types/admin";
import type { CategoryItem } from "@/types/home";

type AdminFormState = AdminServicePayload & { featuresText: string; tagsText: string };

function emptyForm(categorySlug = ""): AdminFormState {
  return {
    slug: "",
    name: "",
    provider: "",
    categorySlug,
    priceText: "",
    pricePolicy: "FREEMIUM",
    description: "",
    tagline: "",
    url: "",
    apiDocUrl: "",
    apiSupport: "YES",
    features: [],
    tags: [],
    featuresText: "",
    tagsText: "",
  };
}

export function AdminDashboardSection() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [editingService, setEditingService] = useState<AdminService | null>(null);
  const [formState, setFormState] = useState<AdminFormState>(emptyForm());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const list = await listAdminServices();
      setServices(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "서비스 목록을 불러오지 못했습니다.");
    }
  }, []);

  useEffect(() => {
    refresh();
    getCategories().then(setCategories).catch(() => undefined);
  }, [refresh]);

  const openCreateModal = () => {
    setEditingService(null);
    setFormState(emptyForm(categories[0]?.slug ?? ""));
    setIsModalOpen(true);
  };

  const openEditModal = (service: AdminService) => {
    setEditingService(service);
    setFormState({
      slug: service.id,
      name: service.name,
      provider: service.company,
      categorySlug: categories[0]?.slug ?? "",
      priceText: service.price,
      pricePolicy: "FREEMIUM",
      description: "관리자가 수정한 서비스 정보입니다.",
      tagline: "",
      url: "https://example.com",
      apiDocUrl: "",
      apiSupport: service.apiSupport === "지원" ? "YES" : service.apiSupport === "제한적" ? "LIMITED" : "NO",
      features: ["주요 기능"],
      tags: ["AI"],
      featuresText: "주요 기능",
      tagsText: "AI",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const features = formState.featuresText
      .split(/\n|,/)
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
    const tags = formState.tagsText
      .split(/\n|,/)
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
    if (features.length === 0 || tags.length === 0) {
      setError("기능과 태그를 1개 이상 입력해 주세요.");
      return;
    }
    const payload: AdminServicePayload = {
      slug: formState.slug,
      name: formState.name,
      provider: formState.provider,
      categorySlug: formState.categorySlug,
      priceText: formState.priceText,
      pricePolicy: formState.pricePolicy,
      description: formState.description,
      tagline: formState.tagline,
      url: formState.url,
      apiDocUrl: formState.apiDocUrl,
      apiSupport: formState.apiSupport,
      features,
      tags,
    };
    try {
      if (editingService) {
        await updateAdminService(editingService.id, payload);
        setMessage(`${payload.name} 정보를 수정했습니다.`);
      } else {
        await createAdminService(payload);
        setMessage(`${payload.name} 서비스를 등록했습니다.`);
      }
      closeModal();
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    }
  };

  const handleDelete = async (service: AdminService) => {
    if (!window.confirm(`${service.name} 서비스를 삭제하시겠습니까?`)) {
      return;
    }
    try {
      await deleteAdminService(service.id);
      setMessage(`${service.name} 서비스를 삭제했습니다.`);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "삭제에 실패했습니다.");
    }
  };

  return (
    <section className="bg-[#f8f9fb] py-12">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[36px] font-extrabold leading-tight text-[#0d121a] sm:text-[42px]">
              {ADMIN_DASHBOARD_CONTENT.title}
            </h1>
            <p className="mt-2 text-[19px] font-medium leading-7 text-[#6b7a8f]">
              {ADMIN_DASHBOARD_CONTENT.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-[54px] rounded-[20px] px-7 text-base"
              href="/admin/models"
              variant="secondary"
            >
              승인 관리
            </Button>
            <Button
              className="h-[54px] rounded-[20px] px-9 text-base"
              onClick={openCreateModal}
              type="button"
            >
              등록하기
            </Button>
          </div>
        </div>

        {message ? (
          <p className="mt-5 rounded-xl bg-[#ecf1ff] px-4 py-3 text-sm font-semibold text-blue-600" role="status">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500" role="alert">
            {error}
          </p>
        ) : null}

        <Card className="mt-14 overflow-hidden rounded-[30px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <caption className="sr-only">AI 서비스 데이터 관리 테이블</caption>
              <thead className="bg-[#f8f9fb] text-base font-extrabold text-[#8c99ab]">
                <tr>
                  <th className="px-12 py-6" scope="col">서비스명</th>
                  <th className="px-8 py-6" scope="col">개발사</th>
                  <th className="px-8 py-6" scope="col">가격</th>
                  <th className="px-8 py-6" scope="col">API</th>
                  <th className="px-8 py-6" scope="col">관리</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td className="px-12 py-7 text-sm text-[#8c99ab]" colSpan={5}>
                      등록된 서비스가 없습니다.
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr className="border-t border-[#e5ebf2]" key={service.id}>
                      <td className="px-12 py-7 text-[19px] font-extrabold text-[#0d121a]">
                        {service.name}
                      </td>
                      <td className="px-8 py-7 text-[17px] font-semibold text-[#5c697a]">
                        {service.company}
                      </td>
                      <td className="px-8 py-7 text-[17px] font-semibold text-[#5c697a]">
                        {service.price}
                      </td>
                      <td
                        className={cn(
                          "px-8 py-7 text-[17px] font-extrabold",
                          service.apiSupport === "지원" ? "text-blue-600" : "text-[#8c99ab]",
                        )}
                      >
                        {service.apiSupport}
                      </td>
                      <td className="px-8 py-7">
                        <div className="flex gap-2">
                          <button
                            className="h-[34px] rounded-[10px] border border-[#e0e5f0] bg-white px-4 text-[13px] font-bold text-[#384252] hover:bg-[#f8f9fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                            onClick={() => openEditModal(service)}
                            type="button"
                          >
                            수정
                          </button>
                          <button
                            className="h-[34px] rounded-[10px] bg-[#fff2f2] px-4 text-[13px] font-bold text-[#e5484d] hover:bg-[#ffe6e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d] focus-visible:ring-offset-2"
                            onClick={() => handleDelete(service)}
                            type="button"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Modal
        onClose={closeModal}
        open={isModalOpen}
        title={editingService ? "서비스 정보 수정" : "서비스 등록"}
      >
        <form className="space-y-3" onSubmit={handleSave}>
          <AdminField
            label="Slug"
            onChange={(value) => setFormState((prev) => ({ ...prev, slug: value }))}
            value={formState.slug}
          />
          <AdminField
            label="서비스명"
            onChange={(value) => setFormState((prev) => ({ ...prev, name: value }))}
            value={formState.name}
          />
          <AdminField
            label="개발사"
            onChange={(value) => setFormState((prev) => ({ ...prev, provider: value }))}
            value={formState.provider}
          />
          <label className="block text-sm font-bold text-[#384252]">
            카테고리
            <select
              className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e5f0] px-4 text-sm font-semibold text-[#0d121a] focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, categorySlug: event.target.value }))
              }
              value={formState.categorySlug}
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          <AdminField
            label="가격 표시"
            onChange={(value) => setFormState((prev) => ({ ...prev, priceText: value }))}
            value={formState.priceText}
          />
          <label className="block text-sm font-bold text-[#384252]">
            가격 정책
            <select
              className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e5f0] px-4 text-sm font-semibold text-[#0d121a]"
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  pricePolicy: event.target.value as AdminFormState["pricePolicy"],
                }))
              }
              value={formState.pricePolicy}
            >
              <option value="FREE">FREE</option>
              <option value="PAID">PAID</option>
              <option value="FREEMIUM">FREEMIUM</option>
            </select>
          </label>
          <AdminField
            label="서비스 URL"
            onChange={(value) => setFormState((prev) => ({ ...prev, url: value }))}
            value={formState.url}
          />
          <label className="block text-sm font-bold text-[#384252]">
            API 지원
            <select
              className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e5f0] px-4 text-sm font-semibold text-[#0d121a]"
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  apiSupport: event.target.value as AdminFormState["apiSupport"],
                }))
              }
              value={formState.apiSupport}
            >
              <option value="YES">지원</option>
              <option value="LIMITED">제한적</option>
              <option value="NO">미지원</option>
            </select>
          </label>
          <label className="block text-sm font-bold text-[#384252]">
            설명
            <textarea
              className="mt-1.5 min-h-[100px] w-full rounded-xl border border-[#e0e5f0] px-4 py-3 text-sm font-medium text-[#0d121a]"
              onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
              required
              value={formState.description}
            />
          </label>
          <label className="block text-sm font-bold text-[#384252]">
            기능 (줄바꿈 또는 쉼표)
            <textarea
              className="mt-1.5 min-h-[80px] w-full rounded-xl border border-[#e0e5f0] px-4 py-3 text-sm font-medium text-[#0d121a]"
              onChange={(event) => setFormState((prev) => ({ ...prev, featuresText: event.target.value }))}
              required
              value={formState.featuresText}
            />
          </label>
          <label className="block text-sm font-bold text-[#384252]">
            태그 (줄바꿈 또는 쉼표)
            <textarea
              className="mt-1.5 min-h-[60px] w-full rounded-xl border border-[#e0e5f0] px-4 py-3 text-sm font-medium text-[#0d121a]"
              onChange={(event) => setFormState((prev) => ({ ...prev, tagsText: event.target.value }))}
              required
              value={formState.tagsText}
            />
          </label>

          <div className="flex gap-3 pt-2">
            <Button className="h-11 flex-1 rounded-xl" type="submit">저장</Button>
            <Button className="h-11 flex-1 rounded-xl" onClick={closeModal} type="button" variant="ghost">
              취소
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

type AdminFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function AdminField({ label, value, onChange }: AdminFieldProps) {
  return (
    <label className="block text-sm font-bold text-[#384252]">
      {label}
      <input
        className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e5f0] px-4 text-sm font-semibold text-[#0d121a] focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={(event) => onChange(event.target.value)}
        required
        type="text"
        value={value}
      />
    </label>
  );
}
