package com.skilldistillery.todos.entities;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class TodoTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Todo todo;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("TodoJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		todo = em.find(Todo.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		todo = null;
	}

	@Test
	void test_Todo_entity_mapping() {
		assertNotNull(todo);
		assertEquals("Go round Mum's", todo.getTask());
	}

	@Test
	void test_Todo_User_ManyToOne_mapping() {
		assertNotNull(todo);
		assertNotNull(todo.getUser());
		assertEquals("shaun", todo.getUser().getUsername());
	}
	
}