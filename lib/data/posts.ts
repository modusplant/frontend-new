import {
  Post,
  PrimaryCategory,
  SecondaryCategory,
  SecondaryCategoryDaily,
  SecondaryCategoryQnA,
} from "@/lib/types";

/**
 * 더미 게시물 데이터
 */
export const dummyPosts: Post[] = [
  {
    id: "1",
    primaryCategoryId: "148d6e33-102d-4df4-a4d0-5ff233665548",
    secondaryCategoryId: "264d6e33-102d-4df4-a4d0-5ff233665548",
    primaryCategory: "daily",
    secondaryCategory: "foliage-wildflower",
    title: "몬스테라 잎이 노랗게 변하는 이유와 해결 방법",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "몬스테라를 키우다보면 잎이 노랗게 변하는 경우가 있습니다. 주요 원인은 과습, 영양 부족, 빛 부족 등이 있는데요...",
      },
    ],
    excerpt:
      "몬스테라 잎이 노랗게 변하는 주요 원인과 해결 방법을 알아봅니다.몬스테라 잎이 노랗게 변하는 주요 원인과 해결 방법을 알아봅니다.몬스테라 잎이 노랗게 변하는 주요 원인과 해결 방법을 알아봅니다.",
    author: {
      id: "user1",
      nickname: "식물집사",
      avatar: "/images/avatar1.jpg",
    },
    thumbnail: "/post/image_01.png",
    createdAt: new Date("2024-11-08"),
    likes: 32,
    commentCount: 8,
    isBookmarked: false,
    isPublished: true,
  },
  {
    id: "2",
    primaryCategoryId: "148d6e33-102d-4df4-a4d0-5ff233665548",
    secondaryCategoryId: "364d6e33-102d-4df4-a4d0-5ff233665548",
    primaryCategory: "daily",
    secondaryCategory: "succulent-cactus",
    title: "다육이 번식 성공 후기 - 엽삽 방법",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "다육이를 엽삽으로 번식시키는 방법을 공유합니다. 준비물과 과정을 자세히 설명드릴게요.",
      },
    ],
    excerpt: "다육이 엽삽으로 성공적으로 번식시킨 경험을 공유합니다.",
    author: {
      id: "user2",
      nickname: "다육러버",
      avatar: "/images/avatar2.jpg",
    },
    thumbnail: "/post/image_02.png",
    createdAt: new Date("2024-11-07"),
    likes: 45,
    commentCount: 12,
    isBookmarked: true,
    isPublished: true,
  },
  {
    id: "3",
    primaryCategoryId: "148d6e33-102d-4df4-a4d0-5ff233665548",
    secondaryCategoryId: "464d6e33-102d-4df4-a4d0-5ff233665548",
    primaryCategory: "daily",
    secondaryCategory: "veranda-garden",
    title: "우리집 식물들 소개합니다 🌿",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "오랜만에 우리집 식물들을 소개해요. 현재 20종류 정도 키우고 있는데, 각자의 특징과 관리 방법을 공유합니다.",
      },
    ],
    excerpt: "20여 종의 식물을 키우며 얻은 노하우를 공유합니다.",
    author: {
      id: "user3",
      nickname: "그린홀릭",
      avatar: "/images/avatar3.jpg",
    },
    thumbnail: "/post/image_03.png",
    createdAt: new Date("2024-11-06"),
    likes: 67,
    commentCount: 23,
    isBookmarked: false,
    isPublished: true,
  },
  {
    id: "4",
    primaryCategoryId: "248d6e33-102d-4df4-a4d0-5ff233665548",
    secondaryCategoryId: "564d6e33-102d-4df4-a4d0-5ff233665548",
    primaryCategory: "qna",
    secondaryCategory: "leaf-growth-pest",
    title: "산세베리아 잎 끝이 갈색으로 변했어요",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "산세베리아를 키운지 3개월 정도 됐는데, 최근 잎 끝이 갈색으로 변하기 시작했습니다. 무엇이 문제일까요?",
      },
    ],
    excerpt: "산세베리아 잎 끝 갈변 증상에 대한 질문입니다.",
    author: {
      id: "user4",
      nickname: "식물초보",
      avatar: "/images/avatar4.jpg",
    },
    thumbnail: "/post/image_04.png",
    createdAt: new Date("2024-11-05"),
    likes: 18,
    commentCount: 15,
    isBookmarked: false,
    isPublished: true,
  },
  {
    id: "5",
    primaryCategoryId: "248d6e33-102d-4df4-a4d0-5ff233665548",
    secondaryCategoryId: "664d6e33-102d-4df4-a4d0-5ff233665548",
    primaryCategory: "qna",
    secondaryCategory: "watering-soil",
    title: "겨울철 물주기 주기는 얼마나 해야 하나요?",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "겨울이 다가오면서 물주기 주기를 어떻게 조절해야 할지 모르겠어요. 조언 부탁드립니다.",
      },
    ],
    excerpt: "겨울철 식물 물주기 주기에 대한 질문입니다.",
    author: {
      id: "user1",
      nickname: "식물집사",
      avatar: "/images/avatar1.jpg",
    },
    thumbnail: "/post/image_01.png",
    createdAt: new Date("2024-11-04"),
    likes: 89,
    commentCount: 34,
    isBookmarked: true,
    isPublished: true,
  },
  {
    id: "6",
    primaryCategoryId: "348d6e33-102d-4df4-a4d0-5ff233665548",
    secondaryCategoryId: "764d6e33-102d-4df4-a4d0-5ff233665548",
    primaryCategory: "tip",
    secondaryCategory: "all",
    title: "스킨답서스 물꽂이로 키우기",
    content: [
      {
        type: "text",
        order: 1,
        filename: "text_0.txt",
        data: "스킨답서스를 물꽂이로 키우는 방법을 소개합니다. 흙보다 관리가 쉽고 인테리어 효과도 좋아요!",
      },
    ],
    excerpt: "스킨답서스 물꽂이 방법과 주의사항을 알아봅니다.",
    author: {
      id: "user5",
      nickname: "물꽂이마스터",
      avatar: "/images/avatar5.jpg",
    },
    thumbnail: "/post/image_02.png",
    createdAt: new Date("2024-11-03"),
    likes: 56,
    commentCount: 19,
    isBookmarked: false,
    isPublished: true,
  },
];

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
