//upload resume

export const uploadResumeAPI = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('token');
  console.log('TOKEN:', token);

  const res = await fetch('http://localhost:4000/resume/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`, // 👈 FIX
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');

  return res.json();
};
