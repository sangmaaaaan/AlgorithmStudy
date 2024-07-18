### Stack
Vector를 상속받는 클래스이다. **후입선출 (LIFO; Last-In-First-Out)** 구조로, 가장 나중에 저장(push)된 데이터가 가장 먼저 인출(pop)된다. 이러한 특성으로 인해 실생활에서는 페이지 뒤로가기, 실행 취소(undo), 수식 괄호 검사 등에서 사용된다.
![](https://velog.velcdn.com/images/ibaesuyeon/post/4d7c0370-dd3d-4b14-9c1f-84f1674ef0e3/image.png)

다만, 경우에 따라 Stack이 필요한 상황에 대신 ArrayDeque를 사용하기도 한다. 자세한 내용은 뒤에서 Deque를 다루면서 다뤄보겠다.

## Queue
보통 Queue와 Stack이 함께 비교되곤 하는데, Queue는 클래스인 Stack과 달리 인터페이스이다. 또한 **선입선출 (FIFO; First-In-First-Out)** 구조로 가장 먼저 저장된 데이터가 먼저 인출된다. (Stack 그림 참고) Queue 인터페이스를 상속받는 하위 인터페이스는 Deque, BlockingDeque, BlockingQueue, TransferQueue가 있다. 

이 중에서도 Deque 인터페이스를 구현한 LinkedList 클래스가 큐를 구현할 때 많이 사용된다. Java SE 6부터 지원되는 ArrayDeque 클래스도 스택과 큐 메모리 구조를 모두 구현하는데 적합한 클래스이다.

### Deque
Queue 인터페이스를 상속받는 Deque이라는 인터페이스가 있다.
![](https://velog.velcdn.com/images/ibaesuyeon/post/374b635e-d032-4142-91f3-ab0ca84de726/image.png)Deque는 Double-Ended Queue의 줄임말로, 양 쪽에서 데이터의 삽입/삭제가 가능한 자료구조이다. 따라서 Deque는 어떤 쪽으로 입력하고 출력하냐에 따라 Stack으로 쓸 수도 있고, Queue로 쓸 수도 있다. 특히 한 쪽으로만 입력 가능하게끔 설정한 덱을 입력제한덱(scroll)이라고 하고, 한 쪽으로만 출력 가능하게끔 설정한 덱은 출력제한덱(shelf)라고 한다.

Deque 인터페이스를 구현한 클래스로는 ArrayDeque, LinkedBlockingDeque, ConcurrentLinkedDeque, LinkedList 등의 클래스가 있다. Deque은 List보다 속도가 빠르고, 쓰레드 환경에서 안전하다. pop(0)과 같은 메소드를 수행할 때 리스트는 O(N) 연산을 수행하지만 Deque는 O(1) 연산을 수행한다. 따라서 push와 pop이 빈번한 알고리즘의 경우 List보다는 Deque를 사용하는 것이 더 빠르고 효율적이다.

### Stack vs. ArrayDeque
Java 공식 문서에서는 Stack보다는 Deque 인터페이스와 그 구현체를 사용하라고 말한다.
> A more complete and consistent set of LIFO stack operations is provided by the Deque interface and its implementations, which should be used in preference to this class. For example:
```java
Deque<Integer> stack = new ArrayDeque<Integer>();
stack.push(1);
```

일단 위에서 설명했듯 Deque는 Queue로 사용할 수도, Stack으로 사용할 수도 있다. 그럼 이제는 Stack을 쓰나 Deque를 쓰나 무방하지 않은가? 라는 의문이 든다.

Stack이 아닌 ArrayDeque를 써야하는 이유는 Stack이 Vector 클래스를 상속받아 구현됐기 때문이다. Vector는 List를 구현한 클래스로 자바의 레거시 코드 중 하나이며 하위 버전 호환을 위해서 남아있다. Vector는 동기화된 메소드로 구성되어 있어 멀티 쓰레드 환경에서 안전하나, 단일 쓰레드 환경에서도 동기화 처리에 대한 오버헤드가 발생하여 성능 저하가 발생할 수 있다. 따라서 단일 쓰레드 환경에서는 ArrayList를 사용하는 것이 성능 상 유리하며, Java 1.5 이후부터는 `Collections.synchronizedList`가 제공되므로 ArrayList를 사용하면서도 동기화 처리가 가능하다. 따라서 쓰레드 환경에 무관하게 ArrayList를 사용하는 것이 낫다.

Vector 대신 ArrayList를 사용해야 하는 이유와 Stack 대신 ArrayDeque를 사용해야 하는 이유는 거의 같다고 볼 수 있다. 단, ArrayDeque는 sunchronizedList같은 메소드를 제공하지는 않으므로 멀티 쓰레드 환경에서는 외부 동기화를 통해 안전하게 사용이 가능하다.
#### ArrayDeque vs. LinkedList
여담으로, ArrayDeque가 LinkedList보다도 속도와 메모리 측면에서 더 효율적이라고 한다. 그러니 큐를 구현할 때도 ArrayDeque를 사용하는 것이 더 나은 선택이 될 수 있다. 다만, ArrayDeque는 null을 요소로 추가할 수 없으나 LinkedList는 null을 추가할 수 있다. 
>This class is likely to be faster than Stack when used as a stack, and faster than LinkedList when used as a queue.

---
Ref.
https://kevinntech.tistory.com/16
https://soft.plusblog.co.kr/24
https://jee-young.tistory.com/31
https://vanslog.io/posts/language/java/why-use-deque-instead-of-stack/
https://velog.io/@newdana01/Java-큐-구현시-ArrayDeque와-LinkedList-성능-차이-Deque-Queue-인터페이스
https://www.tcpschool.com/java/java_collectionFramework_concept
