import axios from 'axios'
import { base_url } from './constants/constants'
const instance = axios.create({
  baseURL: base_url,
});
export default instance;