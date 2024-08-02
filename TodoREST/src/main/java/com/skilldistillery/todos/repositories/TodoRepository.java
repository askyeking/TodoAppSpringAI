package com.skilldistillery.todos.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.todos.entities.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
	Set<Todo> findByUser_Username(String username);
	Todo findByUser_UsernameAndId(String username, int todoId);
	boolean existsByUser_UsernameAndId(String username, int todoId);
	Set<Todo> findByUser_UsernameAndCompleted(String username, boolean completed);
}