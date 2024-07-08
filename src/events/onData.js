import config from '../config/config.js';
import { HANDLER_IDS } from '../constants/handlerIds.js';
import { PACKET_TYPE } from '../constants/header.js';
import initialHandler from '../handlers/user/initial.handler.js';
import { getUserById } from '../session/user.session.js';
import { packetParser } from '../utils/parser/packetParser.js';
import { getNextSequence } from '../session/user.session.js';
import { getHandlerById } from '../handlers/index.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE();
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);
    if (socket.buffer.length >= length) {
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);
      console.log(`length: ${length}`);
      console.log(`packet: ${packet}`);
      console.log(`packetType: ${packetType}`);
      switch (packetType) {
        case PACKET_TYPE.NORMAL:
          const { handlerId, userId, payload, sequence } = packetParser(packet);

          const user = getUserById(userId);
          if (user && user.sequence !== sequence) {
            console.error('잘못된 호출값 입니다.');
          }

        // console.log(`handlerId: ${handlerId}`);
        // console.log(`userId: ${userId}`);
        // console.log(`payload: ${payload}`);
        // console.log(`sequence: ${sequence}`);
      }
    } else {
      break;
    }
  }
};
