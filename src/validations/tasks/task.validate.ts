import * as Yup from 'yup';

const taskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELLED: 'cancelled'
};

const taskPostSchema = Yup.object().shape({

  title: Yup.string().required().min(3).max(100),

  description: Yup.string().max(500).default(""),
  
  status: Yup.string().oneOf(Object.values(taskStatus)).default(taskStatus.PENDING),

  isDone: Yup.boolean().default(false),

  user: Yup.object().shape({
    _id: Yup.string().required(),
    username: Yup.string().required(),
  }).required(),

  categories: Yup.object().shape({
    _id: Yup.string().required(),
    name: Yup.string().required()
  }).required(),

  likes: Yup.array().of(
    Yup.object().shape({
      _id: Yup.string().required(),
      username: Yup.string().required(),
      createdAt: Yup.date().default(() => new Date())
    })
  ).default([]),

  comments: Yup.array().of(
    Yup.object().shape({
      _id: Yup.string().required(),
      username: Yup.string().required(),
      content: Yup.string().required().max(500),
      createdAt: Yup.date().default(() => new Date())
    })
  ).default([])

});

export { taskPostSchema };

