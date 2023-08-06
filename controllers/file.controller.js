const fs = require('fs');
const path = require('path');
const File = require('../models/file.model');

async function uploadFile(req, res) {
  try {
    console.log(req.body)
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, mimetype, filename, size } = req.file;
    const extension = path.extname(originalname);
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    const file = await File.create({
      title: originalname,
      extension,
      mimetype,
      filesize: size,
      path: filePath,
    });

    return res.json(file);
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getFileById(req, res) {
  try {
    const fileId = req.params.id;
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    return res.json(file);
  } catch (error) {
    console.error('Error fetching file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function downloadFile(req, res) {
  try {
    const fileId = req.params.id;
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(file.path, file.filename, (error) => {
      if (error) {
        console.error('Error downloading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateFile(req, res) {
  try {
    const fileId = req.params.id;
    const { originalname, mimetype } = req.file;

    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    file.filename = originalname;
    file.mimetype = mimetype;
    await file.save();

    return res.json(file);
  } catch (error) {
    console.error('Error updating file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteFile(req, res) {
  try {
    const fileId = req.params.id;
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    fs.unlinkSync(file.path);

    await file.destroy();

    return res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getFilesList(req, res) {
  try {
    const listSize = parseInt(req.query.list_size) || 10;
    const page = parseInt(req.query.page) || 1;

    const offset = (page - 1) * listSize;
    console.log("HERE IS THE OFFSET", offset)
    const files = await File.findAndCountAll({
      limit: listSize,
      offset,
    });

    const totalPages = Math.ceil(files.count / listSize);

    return res.json({
      page,
      total_pages: totalPages,
      total_files: files.count,
      files: files.rows,
    });
  } catch (error) {
    console.error('Error fetching files list:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  uploadFile,
  getFileById,
  downloadFile,
  updateFile,
  deleteFile,
  getFilesList
};
