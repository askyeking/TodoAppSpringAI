package com.skilldistillery.todos.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.todos.entities.Todo;
import com.skilldistillery.todos.services.AuthService;
import com.skilldistillery.todos.services.TodoService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class OpenAIController {
	
	private final ChatClient chatClient;
	private final TodoService todoService;
	private final AuthService authService;

	public OpenAIController(ChatClient.Builder chatClientBuilder, TodoService todoService, AuthService authService) {
		this.todoService = todoService;
		this.authService = authService;
		this.chatClient = chatClientBuilder
        		.defaultSystem("When responding, pretend you are Shaun from the film 'Shaun of the Dead'."
        				+ " When responding also be very clear and concise, return your respons as comma seperated values so the text is easily parsable in an application. "
        				+ "Don't number them, and no whitespace characters please.") //add text here to change baseline personality/goals/role of the AI
				.build();
	}

	@GetMapping("ai/jokes")
	public String generateJoke(@RequestBody String topic) {
		return this.chatClient.prompt()
    			.user(u -> u.text("Tell me a joke about {topic}.").param("topic", topic))
//				.user(topic)
				.call().content();
	}

	
	@GetMapping("ai/suggestions")
	public String[] generateSuggestions(Principal principal, HttpServletRequest req, HttpServletResponse res) {
		
		Set<Todo> currentTodoList = this.todoService.getActiveTodos(principal.getName());
		StringBuilder currentTodosText = new StringBuilder();
		for (Todo todo : currentTodoList) {
			currentTodosText.append(todo.getTask()).append("\n");
		}
		
		System.out.println(currentTodosText.toString());
		String aiResponse =  this.chatClient.prompt()
    			.user(u -> u.text("Give me 5 suggestions for items to add to my todo list. I've already got the following on my list, make sure you do not suggest a todo I already have in my list.:\n{todos}")
    					.param("todos", currentTodosText.toString()))
				.call().content();
		String[] suggestions = aiResponse.split(",");
		return suggestions;
	}

}
