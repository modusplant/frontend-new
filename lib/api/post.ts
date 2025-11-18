import { apiClient } from "@/lib/api/client";
import {
  GetPostsRequest,
  GetPostsResponseData,
  ApiResponse,
} from "@/lib/types/api.type";

/**
 * 게시글 목록 조회 API
 */
export const postApi = {
  /**
   * 게시글 목록 조회 (커서 기반 페이지네이션)
   * @param params 조회 파라미터
   * @returns 게시글 목록 응답
   */
  async getPosts(
    params: GetPostsRequest
  ): Promise<ApiResponse<GetPostsResponseData>> {
    const queryParams = new URLSearchParams();

    // size는 필수
    queryParams.append("size", params.size.toString());

    // 선택적 파라미터 추가
    if (params.lastPostId) {
      queryParams.append("lastPostId", params.lastPostId);
    }

    if (params.primaryCategoryId) {
      queryParams.append("primaryCategoryId", params.primaryCategoryId);
    }

    if (params.secondaryCategoryId) {
      queryParams.append("secondaryCategoryId", params.secondaryCategoryId);
    }

    const endpoint = `/api/v1/communication/posts?${queryParams.toString()}`;

    return apiClient<GetPostsResponseData>(endpoint, {
      method: "GET",
      skipAuth: false, // 인증 필요 (북마크 상태 등)
    });
  },
};
