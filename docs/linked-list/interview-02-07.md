# 面试题 02.07. 链表相交
## 初版代码
```cpp
class Solution {
  private:
	int getLen(ListNode *head)
	{
		int len = 0;
		while (head != nullptr) {
			head = head->next;
			len++;
		}
        return len;
	}

  public:
	ListNode *getIntersectionNode(ListNode *headA, ListNode *headB)
	{
		int lenA = getLen(headA), lenB = getLen(headB);
		ListNode *new_headA = new ListNode(0, headA),
				 *new_headB = new ListNode(0, headB);
		ListNode *head1, *head2; // head1是那个多的
		int d = abs(lenA - lenB);
		if (lenA > lenB) {
			head1 = new_headA;
			head2 = new_headB;
		}
		else {
			head1 = new_headB;
			head2 = new_headA;
		}

		ListNode *p1 = head1, *p2 = head2;
		for (int i = 0; i < d; i++) {
			p1 = p1->next;
		}
		while (p1 != p2 && p1 != nullptr) {
			p1 = p1->next;
			p2 = p2->next;
			if (p1 == nullptr) {
				return nullptr;
			}
		}

		return p1;
	}
};
```

我的思路，这个就是要你找两个链表里第一次相同的结点。从这个结点以后开始所有的结点都一模一样，那长度也是一样的。需要把两个遍历链表的指针的节奏统一成末尾对齐，这样如果有共同结点的话，他们一定能同时访问到，这样就能判断了。为了让两个指针统一节奏，需要让一个指针先走一段距离，这个距离一定是两个链表的长度之差。然后可能会产生一个自然的问题，让那个指针先跑这个差值，会不会提前进入重合段？答案是不可能，设较长长度为$l_2$，较短长度为$l_1$，重合段长度是$l$，一定有$l\le l_1$ ,那么$l_2 - l_1 \le l_2 - l$ 其中$l_2 - l_1$是我让指针提前走过的距离，$l_2 - l$是较长链表里非重合段的长度，一定是进不去的。

下面开始实践

先遍历一遍两个链表，看看长度。这个就是两次重复的$O(n)$，没关系。然后我为了不麻烦，直接加了虚拟头结点，并自己给了两个头指针，指定好1号是长的链表，2号是短的链表，d是长度差值。

给了2个指针，p1p2。现在让p1先走d，for一下d次。然后开始同步行进，退出循环条件是两指针相等了或者到头了。其实到头了直接会在循环里面指针更新后触发，然后直接返回null退出了。如果没到头，发现相等了，说明这个公共结点找到了，退出循环，返回p1或者p2.

## 后续检查
其实用不着自己再加个1和2,直接swap就好了

然后加头结点也是没用的，这里根本不涉及到头插/删。