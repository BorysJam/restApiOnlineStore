
const token = localStorage.getItem('bearer')
 

  axios.create({
  headers: {
     Authorization: `Bearer ${token}`,
     "Content-Type": "application/json",
  },
});