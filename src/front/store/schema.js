import { schema } from 'normalizr';

export const camera = new schema.Entity('cameras', {}, { idAttribute: 'uin' });
export const page = new schema.Entity('pages', { cameras: [camera] });
