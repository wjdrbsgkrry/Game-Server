//연결 해제 메서지를 받는 공간
export const onEnd = (socket) => () => {
  console.log('클라이언트 연결이 종료되었습니다.');
};
