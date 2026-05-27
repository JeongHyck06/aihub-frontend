"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { ADMIN_APPROVAL_CONTENT } from "@/constants/admin";
import {
  approveModelRequest,
  getAdminModelRequests,
  rejectModelRequest,
} from "@/shared/api";
import type {
  AdminModelRequest,
  AdminModelRequestStats,
  AdminModelRequestStatus,
} from "@/types/admin";

const statusLabel: Record<AdminModelRequestStatus, string> = {
  pending: "대기 중",
  approved: "승인됨",
  rejected: "반려됨",
};

export function AdminModelApprovalSection() {
  const [requests, setRequests] = useState<AdminModelRequest[]>([]);
  const [stats, setStats] = useState<AdminModelRequestStats>({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [selectedRequest, setSelectedRequest] = useState<AdminModelRequest | null>(null);
  const [rejectTarget, setRejectTarget] = useState<AdminModelRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const { items, stats: statsData } = await getAdminModelRequests("PENDING");
      setRequests(items);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "신청 목록을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleApprove = async (request: AdminModelRequest) => {
    try {
      await approveModelRequest(request.id);
      setMessage(`${request.serviceName} 신청을 ${statusLabel.approved} 처리했습니다.`);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "승인에 실패했습니다.");
    }
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    if (!rejectReason.trim()) {
      setError("반려 사유를 입력해 주세요.");
      return;
    }
    try {
      await rejectModelRequest(rejectTarget.id, rejectReason.trim());
      setMessage(`${rejectTarget.serviceName} 신청을 ${statusLabel.rejected} 처리했습니다.`);
      setRejectTarget(null);
      setRejectReason("");
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "반려에 실패했습니다.");
    }
  };

  const statsList = [
    { label: "대기 중", value: stats.pending, color: "text-[#f0631f]" },
    { label: "승인됨", value: stats.approved, color: "text-[#05754a]" },
    { label: "반려됨", value: stats.rejected, color: "text-[#c71515]" },
  ];

  return (
    <section className="bg-[#f8f9fb] py-10">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <div aria-hidden="true" className="h-1.5 w-[72px] rounded-[3px] bg-blue-600" />
        <h1 className="mt-2.5 text-[32px] font-extrabold leading-tight text-[#0d121a] sm:text-4xl">
          {ADMIN_APPROVAL_CONTENT.title}
        </h1>
        <p className="mt-2 text-[17px] font-medium leading-7 text-[#616e80]">
          {ADMIN_APPROVAL_CONTENT.description}
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:w-[632px]">
          {statsList.map((stat) => (
            <Card className="rounded-2xl p-6" key={stat.label}>
              <p className={`text-[32px] font-extrabold leading-10 ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-[13px] font-medium leading-5 text-[#8c99ab]">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <h2 className="text-[22px] font-extrabold leading-7 text-[#0d121a]">
            {ADMIN_APPROVAL_CONTENT.listTitle}
          </h2>
          {message ? (
            <p className="text-sm font-semibold text-blue-600" role="status">{message}</p>
          ) : null}
          {error ? (
            <p className="text-sm font-semibold text-red-500" role="alert">{error}</p>
          ) : null}
        </div>

        <div className="mt-3 overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-[280px_180px_200px_180px_1fr] rounded-xl border border-[#e8edf5] bg-[#f8f9fb] px-6 py-4 text-[13px] font-bold leading-5 text-[#384252]">
              <span>서비스명</span>
              <span>카테고리</span>
              <span>신청자</span>
              <span>신청일</span>
              <span>처리</span>
            </div>

            <div className="mt-3 space-y-4">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <ApprovalRow
                    key={request.id}
                    onApprove={() => handleApprove(request)}
                    onDetail={() => setSelectedRequest(request)}
                    onReject={() => {
                      setRejectTarget(request);
                      setRejectReason("");
                    }}
                    request={request}
                  />
                ))
              ) : (
                <Card className="rounded-xl p-8 text-center text-sm font-semibold text-[#8c99ab]">
                  대기 중인 신청이 없습니다.
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        onClose={() => setSelectedRequest(null)}
        open={selectedRequest !== null}
        title={selectedRequest?.serviceName ?? "신청 상세"}
      >
        {selectedRequest ? (
          <dl className="space-y-3">
            <div>
              <dt className="font-bold text-[#0d121a]">서비스 URL</dt>
              <dd>{selectedRequest.url}</dd>
            </div>
            <div>
              <dt className="font-bold text-[#0d121a]">카테고리</dt>
              <dd>{selectedRequest.category}</dd>
            </div>
            <div>
              <dt className="font-bold text-[#0d121a]">신청자</dt>
              <dd>{selectedRequest.submitter}</dd>
            </div>
            <div>
              <dt className="font-bold text-[#0d121a]">소개</dt>
              <dd>{selectedRequest.description}</dd>
            </div>
            <div>
              <dt className="font-bold text-[#0d121a]">기능</dt>
              <dd>
                <ul className="list-disc pl-5">
                  {selectedRequest.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        ) : null}
      </Modal>

      <Modal
        onClose={() => {
          setRejectTarget(null);
          setRejectReason("");
        }}
        open={rejectTarget !== null}
        title={`${rejectTarget?.serviceName ?? ""} 반려`}
      >
        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#384252]">
            반려 사유
            <textarea
              className="mt-1.5 min-h-[120px] w-full rounded-xl border border-[#e0e5f0] px-4 py-3 text-sm font-medium text-[#0d121a]"
              onChange={(event) => setRejectReason(event.target.value)}
              value={rejectReason}
            />
          </label>
          <div className="flex gap-3">
            <button
              className="h-11 flex-1 rounded-xl bg-[#fff2f2] text-sm font-extrabold text-[#c71515]"
              onClick={handleReject}
              type="button"
            >
              반려 처리
            </button>
            <button
              className="h-11 flex-1 rounded-xl border border-[#e0e5f0] bg-white text-sm font-bold text-[#384252]"
              onClick={() => {
                setRejectTarget(null);
                setRejectReason("");
              }}
              type="button"
            >
              취소
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

type ApprovalRowProps = {
  request: AdminModelRequest;
  onApprove: () => void;
  onReject: () => void;
  onDetail: () => void;
};

function ApprovalRow({ request, onApprove, onReject, onDetail }: ApprovalRowProps) {
  return (
    <Card className="grid min-h-20 grid-cols-[280px_180px_200px_180px_1fr] items-center rounded-xl px-6 py-4">
      <div>
        <p className="text-[15px] font-bold leading-5 text-[#0d121a]">{request.serviceName}</p>
        <p className="mt-1 text-xs font-medium leading-4 text-[#8c99ab]">{request.url}</p>
      </div>
      <p className="text-sm font-medium leading-5 text-[#384252]">{request.category}</p>
      <p className="text-sm font-medium leading-5 text-[#384252]">{request.submitter}</p>
      <p className="text-sm font-medium leading-5 text-[#384252]">{request.submittedAt}</p>
      <div className="flex gap-3">
        <button
          className="h-9 rounded-[10px] bg-[#ebfcf5] px-6 text-[13px] font-bold text-[#05754a] transition-colors hover:bg-[#d8f7e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05754a] focus-visible:ring-offset-2"
          onClick={onApprove}
          type="button"
        >
          승인
        </button>
        <button
          className="h-9 rounded-[10px] bg-[#feeded] px-6 text-[13px] font-bold text-[#c71515] transition-colors hover:bg-[#fbdada] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c71515] focus-visible:ring-offset-2"
          onClick={onReject}
          type="button"
        >
          반려
        </button>
        <button
          className="h-9 rounded-[10px] border border-[#e0e5f0] bg-[#f8f9fb] px-5 text-[13px] font-bold text-[#384252] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          onClick={onDetail}
          type="button"
        >
          상세보기
        </button>
      </div>
    </Card>
  );
}
