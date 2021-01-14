import axios from "axios";

export default {
  getWorkouts: function () {
    return axios('/api/workouts');
  },
  getWorkout: function (id) {
    return axios.get(`/api/workouts/${id}`);
  },
  postWorkout: function (workoutData) {
    return axios.post('/api/workouts', workoutData);
  },
  putWorkout: function (workoutData) {
    return axios.put(`/api/workouts/${workoutData._id}`, workoutData);
  }
};
