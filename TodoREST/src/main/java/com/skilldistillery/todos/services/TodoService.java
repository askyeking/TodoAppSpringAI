package com.skilldistillery.todos.services;

import java.util.Set;

import com.skilldistillery.todos.entities.Todo;

public interface TodoService {
	public Set<Todo> getActiveTodos(String username);
    public Set<Todo> index(String username);
    public Todo show(String username, int tid);
    public Todo create(String username, Todo todo);
    public Todo update(String username, int tid, Todo todo);
    public boolean destroy(String username, int tid);
}