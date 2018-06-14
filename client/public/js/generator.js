const generator_app = new Vue({
  el: '#generator',
  name: 'book-generator',
  data: {
    new_teacher: '',
    new_student: '',
    book: {
      title: 'Test',
      introduction: '',
      coverImage: null,
      backImage: null
    },
    location: {
      name: '',
      description: '',
      image: null
    },
    teachers: [],
    students: [],
    stories: []
  },
  methods: {
    changeCoverImage: function (event) {
      this.book.coverImage = event.target.files[0];
    },
    changeBackImage: function (event) {
      this.book.backImage = event.target.files[0];
    },
    changeLocationImage: function (event) {
      this.location.image = event.target.files[0];
    },
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
        image: null
      });
      this.stories.push({
        title: '',
        content: ''
      });
      this.new_student = '';
    },
    removeStudent: function (index) {
      if (!confirm(`Are you sure you want to remove student ${this.students[index].name}?`)) return;
      this.students.splice(index, 1);
    },
    changeStudentImage: function (event, index) {
      this.students[index].image = event.target.files[0];
    },
    submit: function (event) {
      if (this.students.length === 0 || this.teachers.length === 0)
        return event.preventDefault();
    }
  }
});