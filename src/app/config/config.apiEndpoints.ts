// import { environment } from "src/environments/environment";

import { environment } from "../../environments/environment";

/* Base API URL API End points */
export const BASE_URL = environment.apiUrl;

export const GET_TEST_CASES = `${BASE_URL}testcases`
export const IMAGE = `${BASE_URL}image`
export const RUN_COMMAND = `${BASE_URL}run-command`