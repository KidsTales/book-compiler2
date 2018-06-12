const generator_app = new Vue({
  el: '#generator',
  name: 'book-generator',
  data: {
    new_teacher: '',
    new_student: '',
    book: {
      title: 'Test',
      introduction: '',
      coverImage: null
    },
    location: {
      name: '',
      description: '',
      image: null
    },
    teachers: [],
    students: []
  },
  methods: {

  },
  computed: {

  }
});