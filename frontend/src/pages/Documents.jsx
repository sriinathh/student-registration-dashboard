import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { documentsService } from '../services/api';
import { useToast } from '../hooks/useToast';

const Documents = () => {
  const { success, error } = useToast();
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await documentsService.getDocuments();
        setRows((res.data.documents || []).map((d) => ({ id: d._id, ...d })));
      } catch (err) {
        error('Failed to fetch documents');
      }
    };

    fetchData();
  }, [error]);

  const handleUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', title);
      if (file) fd.append('file', file);

      await documentsService.uploadDocument(fd);
      success('Uploaded');
      setTitle('');
      setFile(null);
      const res = await documentsService.getDocuments();
      setRows((res.data.documents || []).map((d) => ({ id: d._id, ...d })));
    } catch (err) {
      error('Upload failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await documentsService.deleteDocument(id);
      success('Deleted');
      const res = await documentsService.getDocuments();
      setRows((res.data.documents || []).map((d) => ({ id: d._id, ...d })));
    } catch (err) {
      error('Delete failed');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Documents</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <TextField size="small" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Button variant="contained" onClick={handleUpload}>Upload</Button>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Uploaded</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.filePath ? <a href={row.filePath} target="_blank" rel="noreferrer">Download</a> : '—'}</TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                  <TableCell><Button color="error" onClick={() => handleDelete(row.id)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Documents;
