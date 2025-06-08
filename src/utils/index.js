import { pick } from 'lodash';

export const getInfoData = ({fields = [], object = {}}) => { 
  return pick(object, fields)
}
