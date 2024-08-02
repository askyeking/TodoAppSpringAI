package com.skilldistillery.todos.controllers;

import java.security.Principal;
import java.util.Set;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.todos.entities.Todo;
import com.skilldistillery.todos.services.TodoService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class TodoController {

	private final ChatClient chatClient;
	private final TodoService todoService;

	public TodoController(ChatClient.Builder chatClientBuilder, TodoService todoService) {
		this.todoService = todoService;
		this.chatClient = chatClientBuilder
//        		.defaultSystem("When responding, pretend you are Oprah Winfrey. No puns.") //add text here to change baseline personality/goals/role of the AI
				.build();
	}

	@GetMapping(path = { "todos", "todos/" })
	public Set<Todo> index(Principal principal, HttpServletRequest req, HttpServletResponse res) {
		return todoService.index(principal.getName());
	}

	@GetMapping("todos/{tid}")
	public Todo show(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("tid") int tid) {
		Todo todo = todoService.show(principal.getName(), tid);
		if (todo == null) {
			res.setStatus(404);
		}
		return todo;
	}

	@PostMapping("todos")
	public Todo create(Principal principal, HttpServletRequest req, HttpServletResponse res, @RequestBody Todo todo) {
		try {
			todo = todoService.create(principal.getName(), todo);
			if (todo != null) {
				res.setStatus(201);
				res.setHeader("Location", req.getRequestURL().append("/").append(todo.getId()).toString());
			} else {
				res.setStatus(401);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			todo = null;
		}
		return todo;
	}

	@PutMapping("todos/{tid}")
	public Todo update(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("tid") int tid, @RequestBody Todo todo) {
		Todo updated;
		try {
			updated = todoService.update(principal.getName(), tid, todo);
			if (updated == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			updated = null;
		}
		return updated;
	}

	@DeleteMapping("todos/{tid}")
	public void destroy(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("tid") int tid) {
		try {
			if (todoService.destroy(principal.getName(), tid)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
}