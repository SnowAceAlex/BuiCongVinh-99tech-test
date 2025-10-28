import { Router } from "express";
import {
  createResource,
  listResources,
  getResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";

const router = Router();

// POST /api/resources - Create a resource
router.post("/", createResource);

// GET /api/resources - List resources with filters
//1: List all resources without any filters
//2: List resources with filters by name
//3: List resources with filters by pagination
//4: List resources with filters by name and pagination
router.get("/", listResources);

// GET /api/resources/:id - Get details of a resource
router.get("/:id", getResource);

// PUT /api/resources/:id - Update resource details
router.put("/:id", updateResource);

// DELETE /api/resources/:id - Delete a resource
router.delete("/:id", deleteResource);

export default router;
