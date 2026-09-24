# 卡码58. 区间和
[题目链接](https://kamacoder.com/problempage.php?pid=1070)

我只会这个：
```cpp
#include <iostream>
#include <vector>

using namespace std;

int main()
{
    int n;
    cin >> n;
    vector<int> arr(n);
    for(int i = 0; i<n;i++){
        cin >> arr[i];
    }
    int a,b;
    while(cin >> a >> b){
        int sum = 0;
        for(int i = a; i<=b;i++){
            sum+=arr[i];
        }
        cout << sum << endl;
    }
    return 0;
}
```
**TLE**  

我怎么也没想出来这能怎么压缩，我觉得这已经是基元操作了

## 前缀和
哦哦！原来是把和的结果都存起来，用内存换时间！

数列高中学过，有个前n项和$S_n$。这个就是把所有的前n项和都存起来，然后求区间和的时候，两个前n项和减一下就出了，这种操作在高考数学数列题里有的时候也会出现。注意被减的那个位置的数字是不被包含进去的。时间复杂度全在1次量级。
```cpp
#include <iostream>
#include <vector>

using namespace std;

int main()
{
	int n;
	cin >> n;
	vector<int> arr(n);
	vector<int> s(n);
	int cur_s = 0;
	for (int i = 0; i < n; i++) {
		cin >> arr[i];
		cur_s += arr[i];
		s[i] = cur_s;
	}
	int a, b;
	while (cin >> a >> b) {
		if (a == 0) {
			cout << s[b] << endl;
		}
		else {
			cout << s[b] - s[a - 1] << endl;
		}
	}
	return 0;
}
```