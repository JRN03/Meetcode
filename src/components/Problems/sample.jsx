// Likely store problems in DB with id's and create one large Problem component with a title, description, and expample.
// Data base will store schema/object of the sort {title: String, description: String, exampleInput: String, exampleOutput: String}
// Can probably create in Atlas directly
const sample = () => {
  return (
    <div className="problem">
      <div className = "problem-wrapper">
          <h1>Reverse Linked List</h1>
          <hr></hr>
          <h2>Write a function <em>solution(LinkedList head)</em> that takes the a linked list as an arguement. You can access the head of the LinkedList via LinkedList.head.
              Your function should return a LinkedList object via LinkedList(head). Assume the length of the linked list to be an arbitrary unknown number.
          </h2>
          <h3>Example:</h3>
          <p>Input: [1,2,3,4,5]</p>
          <p>Return: [5,4,3,2,1]</p>
      </div>
    </div>
  )
}

export default sample
//Probably store problem ids and solutions in DB
export const pyTestScript = `
class Node:
  def __init__(self, val):
    self.val = val
    self.next = None

class LinkedList:
  def __init__(self, head):
    self.head = head
  
  def append(self, value):
    curr = self.head
    while curr.next is not None:
      curr = curr.next
    curr.next = Node(value)

  def asList(self):
    curr = self.head
    l = []
    while curr:
      l.append(curr.val)
      curr = curr.next
    return ', '.join([str(e) for e in l])
test1 = LinkedList(Node(1))
test1.append(2)
test1.append(3)
test1.append(4)
test1.append(5)

test2 = LinkedList(Node(10))
test2.append(2)
test2.append(5)
test2.append(113)

test3 = LinkedList(Node(12341))

print("Testing:", test1.asList())
print("Expected: 5, 4, 3, 2, 1 ",end="")
print("Your Output:",solution(test1).asList())
print("Testing:", test2.asList())
print("Expected: 113, 5, 2, 10 ",end="")
print("Your Output:",solution(test2).asList())
print("Expected: 12341 ",end="")
print("Your Output:",solution(test3).asList())
`;
export const javaTestScript = `

}
`;
export const cTestScript = `

`;
export const cppTestScript = `

`;