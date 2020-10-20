import { Document, date } from '../../firestore/document';

export default class TempoOnline extends Document {
  @date()
  data;

  constructor(id, tempo) {
    super(id);
  }
}
