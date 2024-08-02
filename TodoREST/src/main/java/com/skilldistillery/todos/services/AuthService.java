package com.skilldistillery.todos.services;

import com.skilldistillery.todos.entities.User;

public interface AuthService {

	public User register(User user);
	public User getUserByUsername(String username);
	
}