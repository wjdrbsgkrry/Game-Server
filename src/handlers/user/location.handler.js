import { HANDLER_IDS } from '../../constants/handlerIds.js';
import { createLocationResponse } from '../../utils/parser/response/createLocationResponse.js';

export const locationHandler = ({ socket, userId, payload }) => {
  const { deviceId } = payload;
  const locationResponse = createLocationResponse(
    HANDLER_IDS.LOCATIONUPDATE,
    RESPONSE_SUCCESS_CODE,
    { id: deviceId, playerId: userId, x: payload.x, y: payload.y, message: '위치 파악' },
    deviceId,
  );
  socket.write(locationResponse);
};

export default locationHandler;
