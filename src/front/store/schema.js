import { schema } from 'normalizr';

export const camera = schema.Entity('cameras', {}, { idAttribute: 'camera' });
export const page = schema.Entity('pages', { cameras: [camera] });
