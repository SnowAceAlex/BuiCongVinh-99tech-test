import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

// Create a resource
export const createResource = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Check if the name is provided
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Create the resource
    const resource = await prisma.resource.create({
      data: {
        name,
        description,
      },
    });

    // Return the created resource
    res.status(201).json(resource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ error: "Failed to create resource" });
  }
};

// List resources with basic filters
export const listResources = async (req: Request, res: Response) => {
  try {
    const { name, skip, take } = req.query;

    //Skip is the number of records to skip (for pagination)
    //Take is the number of records to return (for pagination)
    //It mean when skip=5 and take=10 , it will skip the first 5 records and return the next 10 records
    //This one is to implement pagination to display the specific page of the resources

    // Check if the name is provided
    const where = name
      ? {
          name: {
            contains: name as string,
            mode: "insensitive" as const,
          },
        }
      : {};

    // Check if the skip is provided
    const skipValue = skip ? parseInt(skip as string, 10) : 0;
    const takeValue = take ? parseInt(take as string, 10) : undefined;

    // Check if the take is provided
    const findManyArgs: {
      where: typeof where;
      skip: number;
      take?: number;
      orderBy: { createdAt: "desc" };
    } = {
      where,
      skip: skipValue,
      orderBy: {
        createdAt: "desc",
      },
    };

    // Check if the take is provided
    if (takeValue !== undefined) {
      findManyArgs.take = takeValue;
    }

    // Get the resources
    const resources = await prisma.resource.findMany(findManyArgs);

    // Get the total number of resources
    const total = await prisma.resource.count({ where });

    // Return the resources
    res.json({
      data: resources,
      total,
      skip: skipValue || 0,
      take: takeValue || resources.length,
    });
  } catch (error) {
    console.error("Error listing resources:", error);
    res.status(500).json({ error: "Failed to list resources" });
  }
};

// Get details of a resource
export const getResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the resource ID is provided
    if (!id) {
      return res.status(400).json({ error: "Resource ID is required" });
    }

    // Check if the resource exists
    const resource = await prisma.resource.findUnique({
      where: { id: parseInt(id, 10) },
    });

    // Check if the resource exists
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Return the resource
    res.json(resource);
  } catch (error) {
    console.error("Error getting resource:", error);
    res.status(500).json({ error: "Failed to get resource" });
  }
};

// Update resource details
export const updateResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if the resource ID is provided
    if (!id) {
      return res.status(400).json({ error: "Resource ID is required" });
    }

    // Check if the resource exists
    const resource = await prisma.resource.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Update the resource
    const updatedResource = await prisma.resource.update({
      where: { id: parseInt(id!, 10) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
      },
    });

    // Return the updated resource
    res.json(updatedResource);
  } catch (error) {
    console.error("Error updating resource:", error);
    res.status(500).json({ error: "Failed to update resource" });
  }
};

// Delete a resource
export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Resource ID is required" });
    }

    // Check if the resource exists
    const resource = await prisma.resource.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Delete the resource
    await prisma.resource.delete({
      where: { id: parseInt(id!, 10) },
    });

    // Return a success message
    res.status(200).json({
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).json({ error: "Failed to delete resource" });
  }
};
