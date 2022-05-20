import mongoose from 'mongoose';
import Project from '../models/Project.js';

const newProject = async (req, res) => {

  const project = new Project(req.body);

  project.creator = req.user._id;

  try {

    const storedProject = await project.save();

    res.json(storedProject);

  } catch {

    const error = new Error('Error al crear proyecto.');

    return res.status(404).json({ msg: error.message });

  }
}
const getProjects = async (req, res) => {

  const projects = await Project.find().where('creator').equals(req.user);

  try {

    res.json(projects);

  } catch {

    const error = new Error('Error al cargar projectos.');

    return res.status(404).json({ msg: error.message });

  }
}

const getProject = async (req, res) => {
  const { id } = req.params
  let project;

  if (mongoose.Types.ObjectId.isValid(id)) {

    project = await Project.findById(id);

    if(!project){
      const error = new Error('No se encontro projecto, revise sus datos.');
      res.status(404).json({ msg: error.message });
      return;
    }

  } else {

    const error = new Error('No se pudo realizar la busqueda solicitada, revise sus datos.');
    res.status(404).json({ msg: error.message });
    return;

  }

  if (project.creator.toString() !== req.user._id.toString()) {

    const error = new Error('No tienes los accesos para este proyecto.');

    res.status(401).json({ msg: error.message });

    return;
  }

  res.json(project);

}

const editProject = async (req, res) => {
  
  const { id } = req.params
  let project;

  if (mongoose.Types.ObjectId.isValid(id)) {

    project = await Project.findById(id);

    if(!project){
      const error = new Error('No se encontro projecto, revise sus datos.');
      res.status(404).json({ msg: error.message });
      return;
    }

  } else {

    const error = new Error('No se pudo realizar la busqueda solicitada, revise sus datos.');
    res.status(404).json({ msg: error.message });
    return;

  }

  if (project.creator.toString() !== req.user._id.toString()) {

    const error = new Error('No tienes los accesos para este proyecto.');

    res.status(401).json({ msg: error.message });

    return;
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.deliveryDate = req.body.deliveryDate || project.deliveryDate;
  project.client = req.body.client || project.client;
  
  try {

    const editedProject = await project.save();

    res.json(editedProject);

  } catch {

    const error = new Error('Error al editar proyecto.');

    res.status(400).json({ msg: error.message });
  }

}

const deleteProject = async (req, res) => { 
 const { id } = req.params
  let project;

  if (mongoose.Types.ObjectId.isValid(id)) {

    project = await Project.findById(id);

    if(!project){
      const error = new Error('No se encontro projecto, revise sus datos.');
      res.status(404).json({ msg: error.message });
      return;
    }

  } else {

    const error = new Error('No se pudo realizar la busqueda solicitada, revise sus datos.');
    res.status(404).json({ msg: error.message });
    return;

  }

  if (project.creator.toString() !== req.user._id.toString()) {

    const error = new Error('No tienes los accesos para este proyecto.');

    res.status(401).json({ msg: error.message });

    return;
  }

  try {
    await project.deleteOne();
    res.json({msg: 'Proyecto eliminado.'})
  } catch {
    const error = new Error('Error al eliminar el proyecto.');

    res.status(401).json({ msg: error.message });

    return;
  }
}
const addCollaborator = async (req, res) => { }
const deleteCollaborator = async (req, res) => { }
const getTasks = async (req, res) => { }


export {
  getProjects,
  getProject,
  newProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getTasks
}