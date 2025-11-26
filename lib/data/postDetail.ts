import { PostDetail, Comment } from "@/lib/types";

/**
 * 게시글 상세 더미 데이터 (postId: "1")
 */
export const dummyPostDetail: PostDetail = {
  authorUuid: "user-uuid-123",
  authorNickname: "식물집사",
  title: "몬스테라 키우기 완벽 가이드 - 초보자도 쉽게!",
  content: [
    {
      type: "text",
      order: 1,
      data: "안녕하세요! 오늘은 몬스테라 키우기에 대해 자세히 알려드리려고 합니다.\n\n몬스테라는 초보자도 쉽게 키울 수 있는 관엽식물로, 적절한 관리만 해주면 멋진 인테리어 효과를 낼 수 있어요.",
    },
    {
      type: "image",
      order: 2,
      filename: "monstera_01.jpg",
      data: "/post/image_01.png",
    },
    {
      type: "text",
      order: 3,
      data: "## 물주기\n\n몬스테라는 과습에 약하므로 흙이 완전히 마른 후에 물을 주는 것이 좋습니다.\n- 여름: 주 1-2회\n- 겨울: 2주에 1회\n- 손가락으로 흙을 2-3cm 정도 찔러봤을 때 건조하면 물주기",
    },
    {
      type: "text",
      order: 4,
      data: "## 빛 요구량\n\n직사광선은 피하고 밝은 간접광이 좋습니다. 동쪽이나 서쪽 창가가 이상적이에요.\n\n너무 어두운 곳에 두면 잎이 작아지고 성장이 더딜 수 있습니다.",
    },
    {
      type: "image",
      order: 5,
      filename: "monstera_02.jpg",
      data: "/post/image_02.png",
    },
    {
      type: "text",
      order: 6,
      data: "## 분갈이\n\n1-2년마다 한 번씩 분갈이를 해주면 좋습니다.\n봄(3-5월)이 가장 적기이며, 배수가 잘 되는 흙을 사용하세요.\n\n여러분도 몬스테라와 함께 행복한 식물 생활 하시길 바랍니다! 🌿",
    },
  ],
  primaryCategory: "일상",
  secondaryCategory: "관엽/야생화",
  viewCount: 1247,
  likeCount: 89,
  bookmarkCount: 34,
  commentCount: 12,
  createdAt: "2024-11-20T14:30:00",
  updatedAt: "2024-11-21T09:15:00",
  isLiked: false,
  isBookmarked: false,
};

/**
 * 댓글 더미 데이터 (postId: "1")
 */
export const dummyComments: Comment[] = [
  {
    nickname: "초보집사",
    path: "0",
    content:
      "정말 유용한 정보네요! 저도 몬스테라 키우는데 물주기 타이밍을 잘 몰랐었어요. 감사합니다!",
    likeCount: 5,
    createdAt: "2024-11-21T15:20:00",
    isDeleted: false,
    isLiked: false,
  },
  {
    nickname: "식물집사",
    path: "0.0",
    content: "도움이 되셨다니 기쁘네요! 손가락 테스트 꼭 해보세요 ☺️",
    likeCount: 2,
    createdAt: "2024-11-21T15:45:00",
    isDeleted: false,
    isLiked: false,
  },
  {
    nickname: "그린러버",
    path: "0.1",
    content:
      "저는 과습으로 뿌리가 썩은 적이 있어요 ㅠㅠ 이 글 진작 봤으면 좋았을텐데!",
    likeCount: 3,
    createdAt: "2024-11-21T16:10:00",
    isDeleted: false,
    isLiked: true,
  },
  {
    nickname: "플랜테리어",
    path: "1",
    content:
      "몬스테라 잎이 찢어지는 게 정상인가요? 제 몬스테라는 잎이 갈라지지 않아서 걱정이에요.",
    likeCount: 8,
    createdAt: "2024-11-21T17:00:00",
    isDeleted: false,
    isLiked: false,
  },
  {
    nickname: "식물집사",
    path: "1.0",
    content:
      "몬스테라의 잎 갈라짐은 성숙한 증거예요! 어린 잎은 갈라지지 않다가 충분히 자라면 구멍이 생기고 갈라집니다. 빛이 충분하고 건강하게 키우시면 자연스럽게 갈라질 거예요 😊",
    likeCount: 12,
    createdAt: "2024-11-21T17:30:00",
    isDeleted: false,
    isLiked: false,
  },
  {
    nickname: "플랜테리어",
    path: "1.0.0",
    content: "아 그렇군요! 안심이 되네요. 좀 더 기다려볼게요. 감사합니다!",
    likeCount: 1,
    createdAt: "2024-11-21T18:00:00",
    isDeleted: false,
    isLiked: false,
  },
  {
    nickname: "베란다정원",
    path: "2",
    content:
      "사진 속 몬스테라 정말 건강해보이네요! 혹시 비료는 어떤 걸 쓰시나요?",
    likeCount: 4,
    createdAt: "2024-11-22T10:15:00",
    isDeleted: false,
    isLiked: false,
  },
  {
    nickname: "식물박사",
    path: "3",
    content:
      "분갈이 시기 정보 감사합니다. 제 몬스테라도 이번 봄에 분갈이 해줘야겠어요!",
    likeCount: 2,
    createdAt: "2024-11-22T14:30:00",
    isDeleted: false,
    isLiked: false,
  },
  {
    nickname: "삭제된사용자",
    path: "4",
    content: "",
    likeCount: 0,
    createdAt: "2024-11-22T16:00:00",
    isDeleted: true,
    isLiked: false,
  },
  {
    nickname: "반려식물",
    path: "4.0",
    content: "삭제된 댓글에 대한 답글도 잘 보여야 해요!",
    likeCount: 1,
    createdAt: "2024-11-22T16:30:00",
    isDeleted: false,
    isLiked: false,
  },
  {
    nickname: "식물초보",
    path: "5",
    content: "이 글 보고 몬스테라 구매했어요! 잘 키워볼게요 🌱",
    likeCount: 7,
    createdAt: "2024-11-23T09:00:00",
    isDeleted: false,
    isLiked: true,
  },
  {
    nickname: "다육마니아",
    path: "6",
    content: "다음엔 필로덴드론 키우기 가이드도 부탁드려요!",
    likeCount: 15,
    createdAt: "2024-11-23T13:45:00",
    isDeleted: false,
    isLiked: false,
  },
];
