import { addUser } from '../../session/user.session.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/parser/response/createResponse.js';
import { v4 as uuidv4 } from 'uuid';
import { addGameSession } from '../../session/game.session.js';
import { getUserById } from '../../session/user.session.js';

const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId } = payload;

  addUser(socket, deviceId);

  const gameId = uuidv4();
  const gameSession = addGameSession(gameId);

  const user = getUserById(userId);
  if (!user) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
  }
  gameSession.addUser(user);

  const initialResponse = createResponse(
    HANDLER_IDS.INIT,
    RESPONSE_SUCCESS_CODE,
    { userId: deviceId, message: '게임이 생성되었습니다.' },
    deviceId,
  );
  socket.write(initialResponse);
};

export default initialHandler;
