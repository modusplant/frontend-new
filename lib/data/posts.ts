import {
  Post,
  PrimaryCategory,
  SecondaryCategory,
  SecondaryCategoryDaily,
  SecondaryCategoryQnA,
} from "@/lib/types";
import { PostData } from "@/lib/types/api.type";

/**
 * 랜덤 썸네일 이미지 가져오기
 */
function getRandomThumbnail(): string {
  const thumbnails = [
    "/post/image_01.png",
    "/post/image_02.png",
    "/post/image_03.png",
    "/post/image_04.png",
  ];
  return thumbnails[Math.floor(Math.random() * thumbnails.length)];
}

/**
 * API 응답 구조에 맞춘 더미 게시물 데이터
 */
export const dummyPostsData: PostData[] = [
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2RD",
    primaryCategory: "일상",
    secondaryCategory: "관엽/야생화",
    nickname: "식물집사",
    title: "몬스테라 잎이 노랗게 변하는 이유와 해결 방법",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "몬스테라를 키우다보면 잎이 노랗게 변하는 경우가 있습니다. 주요 원인은 과습, 영양 부족, 빛 부족 등이 있는데요...",
      },
    ],
    likeCount: 32,
    commentCount: 8,
    isBookmarked: false,
    publishedAt: "2024-11-08T10:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2RC",
    primaryCategory: "일상",
    secondaryCategory: "다육/선인장",
    nickname: "다육러버",
    title: "다육이 번식 성공 후기 - 엽삽 방법",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "다육이를 엽삽으로 번식시키는 방법을 공유합니다. 준비물과 과정을 자세히 설명드릴게요.",
      },
      {
        type: "image",
        order: 2,
        filename: "image_0.jpg",
        data: "/post/image_02.png",
      },
    ],
    likeCount: 45,
    commentCount: 12,
    isBookmarked: true,
    publishedAt: "2024-11-07T14:20:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2RB",
    primaryCategory: "일상",
    secondaryCategory: "베란다/정원",
    nickname: "그린홀릭",
    title: "우리집 식물들 소개합니다 🌿",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "오랜만에 우리집 식물들을 소개해요. 현재 20종류 정도 키우고 있는데, 각자의 특징과 관리 방법을 공유합니다.",
      },
      {
        type: "image",
        order: 2,
        filename: "image_0.jpg",
        data: "/post/image_03.png",
      },
    ],
    likeCount: 67,
    commentCount: 23,
    isBookmarked: false,
    publishedAt: "2024-11-06T09:15:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2RA",
    primaryCategory: "Q&A",
    secondaryCategory: "잎상태 / 성장 / 병충해",
    nickname: "식물초보",
    title: "산세베리아 잎 끝이 갈색으로 변했어요",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "산세베리아를 키운지 3개월 정도 됐는데, 최근 잎 끝이 갈색으로 변하기 시작했습니다. 무엇이 문제일까요?",
      },
      {
        type: "image",
        order: 2,
        filename: "image_0.jpg",
        data: "/post/image_04.png",
      },
    ],
    likeCount: 18,
    commentCount: 15,
    isBookmarked: false,
    publishedAt: "2024-11-05T16:45:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R9",
    primaryCategory: "Q&A",
    secondaryCategory: "물주기 / 흙",
    nickname: "식물집사",
    title: "겨울철 물주기 주기는 얼마나 해야 하나요?",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "겨울이 다가오면서 물주기 주기를 어떻게 조절해야 할지 모르겠어요. 조언 부탁드립니다.",
      },
    ],
    likeCount: 89,
    commentCount: 34,
    isBookmarked: true,
    publishedAt: "2024-11-04T11:00:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
  {
    postId: "01JY3PPG5YJ41H7BPD0DSQW2R8",
    primaryCategory: "팁",
    secondaryCategory: "전체",
    nickname: "물꽂이마스터",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    likeCount: 56,
    commentCount: 19,
    isBookmarked: false,
    publishedAt: "2024-11-03T13:30:00",
  },
];

/**
 * PostData를 Post 타입으로 변환 (UI 컴포넌트용)
 */
export function convertPostDataToPost(postData: PostData): Post {
  // 썸네일: content에 image 타입이 있으면 사용, 없으면 랜덤
  const imageContent = postData.content.find((c) => c.type === "image");
  const thumbnail = imageContent ? imageContent.data : getRandomThumbnail();

  // 본문 요약 (첫 번째 텍스트에서 추출)
  const textContent = postData.content.find((c) => c.type === "text");
  const excerpt = textContent ? textContent.data : "";

  // primaryCategory 매핑
  const primaryCategoryMap: Record<string, PrimaryCategory> = {
    일상: "daily",
    "Q&A": "qna",
    팁: "tip",
  };

  // secondaryCategory 매핑 (간단히 문자열 그대로 사용, 필요시 매핑 추가)
  const secondaryCategoryMap: Record<string, SecondaryCategory> = {
    "관엽/야생화": "foliage-wildflower",
    "다육/선인장": "succulent-cactus",
    "베란다/정원": "veranda-garden",
    "잎상태 / 성장 / 병충해": "leaf-growth-pest",
    "물주기 / 흙": "watering-soil",
    전체: "all",
    기타: "etc",
  };

  return {
    id: postData.postId,
    primaryCategoryId: "", // 더미 데이터에서는 빈 문자열
    secondaryCategoryId: "",
    primaryCategory: primaryCategoryMap[postData.primaryCategory] || "daily",
    secondaryCategory:
      secondaryCategoryMap[postData.secondaryCategory] || "etc",
    title: postData.title,
    content: postData.content,
    excerpt,
    author: {
      id: "",
      nickname: postData.nickname,
    },
    thumbnail,
    createdAt: new Date(postData.publishedAt),
    likes: postData.likeCount,
    commentCount: postData.commentCount || 0,
    isBookmarked: postData.isBookmarked || false,
    isPublished: true,
  };
}

/**
 * 더미 게시물 데이터 (Post 타입, UI 컴포넌트용)
 */
export const dummyPosts: Post[] = dummyPostsData.map(convertPostDataToPost);

/**
 * 1차 카테고리별 라벨
 */
export const primaryCategoryLabels: Record<PrimaryCategory, string> = {
  all: "전체",
  daily: "일상",
  qna: "Q&A",
  tip: "팁",
};

/**
 * 2차 카테고리별 라벨 (일상)
 */
export const secondaryCategoryLabelsDaily: Record<
  SecondaryCategoryDaily,
  string
> = {
  all: "전체",
  "foliage-wildflower": "관엽/야생화",
  geranium: "제라늄",
  begonia: "베고니아",
  "succulent-cactus": "다육/선인장",
  "carnivorous-vine-bulb": "식충/덩굴/구근",
  "fern-moss-aquatic": "고사리/이끼/수생",
  "veranda-garden": "베란다/정원",
  "farm-vegetable": "농사/텃밭",
  "plant-shopping": "식물 쇼핑",
  etc: "기타",
};

/**
 * 2차 카테고리별 라벨 (Q&A)
 */
export const secondaryCategoryLabelsQnA: Record<SecondaryCategoryQnA, string> =
  {
    all: "전체",
    "watering-soil": "물주기 / 흙",
    "leaf-growth-pest": "잎상태 / 성장 / 병충해",
    "water-leaf-cutting": "물꽂이 / 잎꽂이",
    "cutting-division": "삽목 / 포기 나누기",
    "repotting-pruning": "분갈이 / 가지치기",
    "overwintering-seed": "월동 / 씨앗",
    "plant-recommend": "식물 추천 / 품종",
    etc: "기타",
  };

/**
 * 2차 카테고리별 라벨 (팁)
 */
export const secondaryCategoryLabelsTip = {
  all: "전체",
};
