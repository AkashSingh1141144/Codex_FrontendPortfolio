import api from "./axios";

// GET all projects
export const getProjects = () => api.get("/projects");

// ADD project
export const addProject = (data) =>
  api.post("/projects", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// UPDATE project
export const updateProject = (id, data) =>
  api.put(`/projects/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// DELETE project
export const deleteProject = (id) => api.delete(`/projects/${id}`);
