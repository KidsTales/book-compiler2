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
    addTeacher: function (event) {
      if (this.new_teacher.length === 0) return;
      this.teachers.push(this.new_teacher);
      this.new_teacher = '';
    },
    removeTeacher: function (index) {
      if (!confirm(`Are you sure you want to remove teacher ${this.teachers[index]}?`)) return;
      this.teachers.splice(index, 1);
    },
    addStudent: function (event) {
      if (this.new_student.length === 0) return;
      this.students.push({
        name: this.new_student,
        bio: '',
        image: null,
        story: {
          title: '',
          content: ''
        }
      });
      this.new_student = '';
    },
    removeStudent: function (index) {
      if (!confirm(`Are you sure you want to remove student ${this.students[index].name}?`)) return;
      this.students.splice(index, 1);
    }
  },
  computed: {

  }
});