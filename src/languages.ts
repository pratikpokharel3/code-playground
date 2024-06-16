export const languageList = [
  {
    alias: "javascript",
    language: "javascript",
    version: "18.15.0",
    content: `const todos = [
  { id: 1, name: 'Hit the gym.', is_completed: true },
  { id: 2, name: 'Buy eggs.', is_completed: false },
  { id: 3, name: 'Pay bills.', is_completed: true },
  { id: 4, name: 'Read a book.', is_completed: false },
]
  
//Completed Todos
todos.forEach(todo => {
  if (todo.is_completed) {
    console.log(todo.name)
  }
})`
  },
  {
    alias: "python",
    language: "python",
    version: "3.10.0",
    content: `todos = [
  { 'id': 1, 'name': 'Hit the gym.', 'is_completed': True },
  { 'id': 2, 'name': 'Buy eggs.', 'is_completed': False },
  { 'id': 3, 'name': 'Pay bills.', 'is_completed': True },
  { 'id': 4, 'name': 'Read a book.', 'is_completed': False },
]

# Completed Todos
for todo in todos:
  if todo['is_completed']:
    print(todo['name'])
`
  },
  {
    alias: "java",
    language: "java",
    version: "15.0.2",
    content: `import java.util.ArrayList;
import java.util.List;

public class Main {
  public static void main(String[] args) {
    List<Object[]> todos = new ArrayList<>();
    
    todos.add(new Object[]{1, "Learn JavaScript.", true});
    todos.add(new Object[]{2, "Learn TypeScript.", false});
    todos.add(new Object[]{3, "Create a basic todo app.", true});
    todos.add(new Object[]{4, "Learn React.", false});

    // Completed Todos
    for (Object[] todo : todos) {
      if ((Boolean) todo[2]) {
        System.out.println((String) todo[1]);
      }
    }
  }
}

`
  },
  {
    alias: "php",
    language: "php",
    version: "8.2.3",
    content: `<?php
$todos = [
  [
    'id' => 1, 
    'name' => 'Hit the gym.', 
    'is_completed' => true
  ],
  [
    'id' => 2, 
    'name' => 'Buy eggs.', 
    'is_completed' => false
  ],
  [
    'id' => 3, 
    'name' => 'Pay bills.', 
    'is_completed' => true
  ],
  [
    'id' => 4, 
    'name' => 'Meet with friends.', 
    'is_completed' => false
  ],
];

// Completed Todos
foreach ($todos as $todo) {
  if ($todo['is_completed']) {
    echo $todo['name'] . "\\n";
  }
}
?>`
  },
  {
    alias: "c",
    language: "c",
    version: "10.2.0",
    content: `#include <stdio.h>
#include <stdbool.h>

struct Todo {
  int id;
  char name[50];
  bool is_completed;
};

int main() {
  struct Todo todos[] = {
    {1, "Hit the gym.", true},
    {2, "Buy eggs.", false},
    {3, "Pay bills.", true},
    {4, "Read a book.", false},
  };
  
  int num_todos = sizeof(todos) / sizeof(todos[0]);
  
  // Completed Todos
  for (int i = 0; i < num_todos; i++) {
    if (todos[i].is_completed) {
      printf("%s\\n", todos[i].name);
    }
  }

  return 0;
}
`
  },
  {
    alias: "c++",
    language: "cpp",
    version: "10.2.0",
    content: `#include <iostream>
#include <vector>

using namespace std;

struct Todo {
  int id;
  string name;
  bool is_completed;
};

int main() {
  vector<Todo> todos = {
    {1, "Hit the gym.", true},
    {2, "Buy eggs.", false},
    {3, "Pay bills.", true},
    {4, "Read a book.", false},
  };

  // Completed Todos
  for (const auto& todo : todos) {
    if (todo.is_completed) {
      cout << todo.name << endl;
    }
  }

  return 0;
}
`
  }
]
