import { api } from "../api/api";

export const endpointExample = {
  async getExample() {
    const response = await api.get("/example");
    return response;
  },
};
