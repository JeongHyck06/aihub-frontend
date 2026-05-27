export {
  ApiError,
  addRequestInterceptor,
  addResponseInterceptor,
  apiClient,
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
  getApiBaseUrl,
  setAccessTokenGetter,
} from "@/shared/api/client";
export {
  kakaoLogin,
  login,
  logout,
  oauthCallback,
  refreshToken,
  sendEmailCode,
  signup,
  verifyEmail,
} from "@/shared/api/auth.api";
export {
  getMe,
  updateProfile,
  getNotificationSettings,
  updateNotificationSettings,
} from "@/shared/api/user.api";
export {
  getHomeSummary,
  getCategories,
  getPopularServices,
  getHotKeywords,
} from "@/shared/api/home.api";
export {
  searchServices,
  getSearchFilters,
  type SearchQuery,
} from "@/shared/api/search.api";
export {
  getServiceDetail,
  getServiceReviews,
  createServiceReview,
} from "@/shared/api/service.api";
export {
  listCommunityPosts,
  createCommunityPost,
  getCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
} from "@/shared/api/community.api";
export {
  getRecommendOptions,
  recommendRuleBased,
  recommendNaturalLanguage,
} from "@/shared/api/recommend.api";
export {
  getCompare,
  getCompareInsight,
  getMyCompareList,
  addToMyCompare,
  removeFromMyCompare,
} from "@/shared/api/compare.api";
export {
  submitModelRequest,
  getMyModelRequests,
  getAdminModelRequests,
  approveModelRequest,
  rejectModelRequest,
} from "@/shared/api/model-request.api";
export {
  listAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from "@/shared/api/admin-service.api";
