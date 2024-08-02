package com.skilldistillery.todos.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.todos.entities.Todo;
import com.skilldistillery.todos.entities.User;
import com.skilldistillery.todos.repositories.TodoRepository;
import com.skilldistillery.todos.repositories.UserRepository;

@Service
public class TodoServiceImpl implements TodoService {
	
	@Autowired
	private TodoRepository todoRepo;
	@Autowired
	private UserRepository userRepo;

	@Override
	public Set<Todo> index(String username) {
		return todoRepo.findByUser_Username(username);
	}

	@Override
	public Todo show(String username, int tid) {
		Todo todo = todoRepo.findByUser_UsernameAndId(username, tid);
		return todo;
	}

	@Override
	public Todo create(String username, Todo todo) {
		User user = userRepo.findByUsername(username);
		if (user != null) {
			todo.setUser(user);
			return todoRepo.saveAndFlush(todo);
		}
		return null;
	}

	@Override
	public Todo update(String username, int tid, Todo todo) {
		Todo existing = todoRepo.findByUser_UsernameAndId(username, tid);
		if (existing != null) {
			existing.setCompleted(todo.getCompleted());
			existing.setCompleteDate(todo.getCompleteDate());
			existing.setDescription(todo.getDescription());
			existing.setDueDate(todo.getDueDate());
			existing.setTask(todo.getTask());
			return todoRepo.saveAndFlush(existing);
		}
		return null;
	}

	@Override
	public boolean destroy(String username, int tid) {
		boolean deleted = false;
		if (todoRepo.existsByUser_UsernameAndId(username, tid)) {
			todoRepo.deleteById(tid);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public Set<Todo> getActiveTodos(String username) {
		return this.todoRepo.findByUser_UsernameAndCompleted(username, false);
	}

}