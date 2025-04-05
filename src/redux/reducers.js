const initialState = {
    user: { id: 'mock-user-1', name: 'Test User', credits: 10, role: 'student', warnings: 0 },
    posts: [
      { _id: '1', text: 'Broken chairs in Room 101', tags: ['infrastructure'], upvotes: 5, status: 'open', userId: 'mock-user-1' },
      { _id: '2', text: 'No water in hostel', tags: ['hostel', 'urgent'], upvotes: 10, status: 'open', userId: 'mock-user-2' },
    ],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'SET_POSTS':
        return { ...state, posts: action.payload };
      case 'ADD_POST':
        return { ...state, posts: [...state.posts, action.payload] };
      case 'UPDATE_POST':
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;