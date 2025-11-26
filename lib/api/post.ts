import { apiClient } from "@/lib/api/client";
import {
  GetPostsRequest,
  GetPostsResponseData,
  ApiResponse,
} from "@/lib/types/api.type";
import { PostDetail } from "@/lib/types";

/**
 * 게시글 관련 API
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

  /**
   * 게시글 상세 조회
   * @param postId 게시글 ID (ULID)
   * @returns 게시글 상세 정보
   */
  async getPostDetail(postId: string): Promise<ApiResponse<PostDetail>> {
    return apiClient<PostDetail>(`/api/v1/communication/posts/${postId}`, {
      method: "GET",
      skipAuth: false,
    });
  },

  /**
   * 게시글 조회수 증가
   * @param postId 게시글 ID (ULID)
   * @returns 성공 응답
   */
  async incrementViewCount(postId: string): Promise<ApiResponse<void>> {
    return apiClient<void>(`/api/v1/communication/posts/${postId}/views`, {
      method: "PATCH",
      skipAuth: false,
    });
  },

  /**
   * 게시글 삭제
   * @param postId 게시글 ID (ULID)
   * @returns 성공 응답
   */
  async deletePost(postId: string): Promise<ApiResponse<void>> {
    return apiClient<void>(`/api/v1/communication/posts/${postId}`, {
      method: "DELETE",
      skipAuth: false,
    });
  },

  /**
   * 게시글 좋아요
   * @param memberId 사용자 ID
   * @param postUlid 게시글 ULID
   * @returns 성공 응답
   */
  async likePost(
    memberId: string,
    postUlid: string
  ): Promise<ApiResponse<void>> {
    return apiClient<void>(
      `/api/v1/members/${memberId}/like/communication/post/${postUlid}`,
      {
        method: "PUT",
        skipAuth: false,
      }
    );
  },

  /**
   * 게시글 좋아요 취소
   * @param memberId 사용자 ID
   * @param postUlid 게시글 ULID
   * @returns 성공 응답
   */
  async unlikePost(
    memberId: string,
    postUlid: string
  ): Promise<ApiResponse<void>> {
    return apiClient<void>(
      `/api/v1/members/${memberId}/like/communication/post/${postUlid}`,
      {
        method: "DELETE",
        skipAuth: false,
      }
    );
  },

  /**
   * 게시글 북마크
   * @param memberId 사용자 ID
   * @param postUlid 게시글 ULID
   * @returns 성공 응답
   */
  async bookmarkPost(
    memberId: string,
    postUlid: string
  ): Promise<ApiResponse<void>> {
    return apiClient<void>(
      `/api/v1/members/${memberId}/bookmark/communication/post/${postUlid}`,
      {
        method: "PUT",
        skipAuth: false,
      }
    );
  },

  /**
   * 게시글 북마크 취소
   * @param memberId 사용자 ID
   * @param postUlid 게시글 ULID
   * @returns 성공 응답
   */
  async unbookmarkPost(
    memberId: string,
    postUlid: string
  ): Promise<ApiResponse<void>> {
    return apiClient<void>(
      `/api/v1/members/${memberId}/bookmark/communication/post/${postUlid}`,
      {
        method: "DELETE",
        skipAuth: false,
      }
    );
  },
};
