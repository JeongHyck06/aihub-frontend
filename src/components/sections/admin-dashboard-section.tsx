"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { ADMIN_DASHBOARD_CONTENT, ADMIN_SERVICES } from "@/constants/admin";
import { cn } from "@/lib/utils";
import type { AdminService } from "@/types/admin";

type ServiceFormState = Omit<AdminService, "id">;

const emptyServiceForm: ServiceFormState = {
  name: "",
  company: "",
  price: "",
  apiSupport: "지원",
};

export function AdminDashboardSection() {
  const [services, setServices] = useState(ADMIN_SERVICES);
  const [editingService, setEditingService] = useState<AdminService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openCreateModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: AdminService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSave = (formState: ServiceFormState) => {
    if (editingService) {
      setServices((currentServices) =>
        currentServices.map((service) =>
          service.id === editingService.id ? { ...service, ...formState } : service,
        ),
      );
      setMessage(`${formState.name} 정보를 수정했습니다.`);
    } else {
      const newService: AdminService = {
        ...formState,
        id: `${formState.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      };
      setServices((currentServices) => [newService, ...currentServices]);
      setMessage(`${formState.name} 서비스를 등록했습니다.`);
    }

    closeModal();
  };

  const handleDelete = (serviceId: string) => {
    const target = services.find((service) => service.id === serviceId);
    setServices((currentServices) =>
      currentServices.filter((service) => service.id !== serviceId),
    );
    setMessage(target ? `${target.name} 서비스를 삭제했습니다.` : "");
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
          <p
            className="mt-5 rounded-xl bg-[#ecf1ff] px-4 py-3 text-sm font-semibold text-blue-600"
            role="status"
          >
            {message}
          </p>
        ) : null}

        <Card className="mt-14 overflow-hidden rounded-[30px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <caption className="sr-only">AI 서비스 데이터 관리 테이블</caption>
              <thead className="bg-[#f8f9fb] text-base font-extrabold text-[#8c99ab]">
                <tr>
                  <th className="px-12 py-6" scope="col">
                    서비스명
                  </th>
                  <th className="px-8 py-6" scope="col">
                    개발사
                  </th>
                  <th className="px-8 py-6" scope="col">
                    가격
                  </th>
                  <th className="px-8 py-6" scope="col">
                    API
                  </th>
                  <th className="px-8 py-6" scope="col">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
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
                        service.apiSupport === "지원"
                          ? "text-blue-600"
                          : "text-[#8c99ab]",
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
                          onClick={() => handleDelete(service.id)}
                          type="button"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
        <AdminServiceForm
          initialValue={editingService ?? emptyServiceForm}
          onCancel={closeModal}
          onSave={handleSave}
        />
      </Modal>
    </section>
  );
}

type AdminServiceFormProps = {
  initialValue: ServiceFormState;
  onCancel: () => void;
  onSave: (formState: ServiceFormState) => void;
};

function AdminServiceForm({
  initialValue,
  onCancel,
  onSave,
}: AdminServiceFormProps) {
  const [formState, setFormState] = useState<ServiceFormState>(initialValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formState);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <AdminFormField
        label="서비스명"
        onChange={(value) => setFormState((current) => ({ ...current, name: value }))}
        value={formState.name}
      />
      <AdminFormField
        label="개발사"
        onChange={(value) =>
          setFormState((current) => ({ ...current, company: value }))
        }
        value={formState.company}
      />
      <AdminFormField
        label="가격"
        onChange={(value) => setFormState((current) => ({ ...current, price: value }))}
        value={formState.price}
      />

      <label className="block text-sm font-bold text-[#384252]">
        API 지원
        <select
          className="mt-1.5 h-12 w-full rounded-xl border border-[#e0e5f0] px-4 text-sm font-semibold text-[#0d121a] focus:outline-none focus:ring-2 focus:ring-blue-600"
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              apiSupport: event.target.value as AdminService["apiSupport"],
            }))
          }
          value={formState.apiSupport}
        >
          <option value="지원">지원</option>
          <option value="제한적">제한적</option>
          <option value="미지원">미지원</option>
        </select>
      </label>

      <div className="flex gap-3 pt-2">
        <Button className="h-11 flex-1 rounded-xl" type="submit">
          저장
        </Button>
        <Button
          className="h-11 flex-1 rounded-xl"
          onClick={onCancel}
          type="button"
          variant="ghost"
        >
          취소
        </Button>
      </div>
    </form>
  );
}

type AdminFormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function AdminFormField({ label, value, onChange }: AdminFormFieldProps) {
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
