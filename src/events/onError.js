//에러 메서지를 받는 공간
export const onError = (socket) => (error) => {
  console.error('소켓 오류', error);
};
