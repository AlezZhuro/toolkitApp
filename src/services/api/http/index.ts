import axios from "axios";
import { token } from "./iterceptors";


export const http = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
    params: {},
  });

  token(http)