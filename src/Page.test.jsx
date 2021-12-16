import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('App', () => {
  const handleChange = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  function renderComponent({
    taskTitle = '', tasks = [], onChangeTitle = handleChange, onClickAddTask, onClickDeleteTask,
  } = { taskTitle: '', onChangeTitle: handleChange }) {
    return render(
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        onClickDeleteTask={onClickDeleteTask}
      />,
    );
  }

  it('renders title', () => {
    const { container } = renderComponent();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
  });

  it('calls handleChange', () => {
    const { getByRole } = renderComponent({ onChangeTitle: handleChange });

    fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });

    expect(handleChange).toBeCalled();
  });

  it('calls handleClickAddTask', () => {
    const { getByText } = renderComponent({
      onClickAddTask: handleClickAddTask,
    });

    expect(handleClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });

  it('calls handleClickDeleteTask ', () => {
    const todoToDeleteId = 1;
    const { getByText } = renderComponent({
      tasks: [{ id: todoToDeleteId, text: '세수하기' }],
      onClickDeleteTask: handleClickDeleteTask,
    });

    expect(handleClickDeleteTask).not.toBeCalled();

    fireEvent.click(getByText('완료'));
    expect(handleClickDeleteTask).toBeCalledWith(todoToDeleteId);
  });
});
