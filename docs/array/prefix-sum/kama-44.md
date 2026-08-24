# 44. 开发商购买土地
[题目链接](https://kamacoder.com/problempage.php?pid=1044)

## 完整代码
```cpp
#include <cmath>
#include <iostream>
#include <limits>
#include <vector>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	int n, m;
	cin >> n >> m;
	// vector<vector<int>> mat(n,vector<int>(m,0));
	vector<int> x_sum(n, 0);
	vector<int> y_sum(m, 0);
	vector<int> x_sum_p(n, 0);
	vector<int> y_sum_p(m, 0);

	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			// cin >> mat[i][j]
			int num;
			cin >> num;
			x_sum[i] += num;
			y_sum[j] += num;
		}
	}

	int cur_s = 0;
	for (int i = 0; i < n; i++) {
		cur_s += x_sum[i];
		x_sum_p[i] = cur_s;
	}
	cur_s = 0;
	for (int i = 0; i < m; i++) {
		cur_s += y_sum[i];
		y_sum_p[i] = cur_s;
	}

	int min = numeric_limits<int>::max();
	for (int i = 0; i <= n - 2; i++) {
		int dif = abs((x_sum_p[n - 1] - x_sum_p[i]) - x_sum_p[i]);
		if (dif < min) {
			min = dif;
		}
	}
	for (int i = 0; i <= m - 2; i++) {
		int dif = abs((y_sum_p[m - 1] - y_sum_p[i]) - y_sum_p[i]);
		if (dif < min) {
			min = dif;
		}
	}
	cout << min << '\n';
	return 0;
}
```

## 思路
他说，只能横切或者纵切，那说明我们其实不关系某一个位置的价值是多少，我们更关心一整列/一整行的价值总和是多少，用不着搞一个二维数组存。因此有：
```cpp
vector<int> x_sum(n, 0);
vector<int> y_sum(m, 0);
for (int i = 0; i < n; i++) {
	for (int j = 0; j < m; j++) {
		int num;
		cin >> num;
		x_sum[i] += num;
		y_sum[j] += num;
	}
}
```
这样，x_sum就是每行的总和，y_sum就是每列的总和。


接下来，我们要看怎么切。其实就只有m+n-2种切法。每一种切法看看差值多少，有没有小于之前的最小值就好了。为了尽可能缩小时间复杂度，使用前缀和的思想，先存前n项和：
```cpp
int cur_s = 0;
for (int i = 0; i < n; i++) {
	cur_s += x_sum[i];
	x_sum_p[i] = cur_s;
}
cur_s = 0;
for (int i = 0; i < m; i++) {
	cur_s += y_sum[i];
	y_sum_p[i] = cur_s;
}
```
然后在这m+n-2里面找最小值：
```cpp
int min = numeric_limits<int>::max();
for (int i = 0; i <= n - 2; i++) {
	int dif = abs((x_sum_p[n - 1] - x_sum_p[i]) - x_sum_p[i]);
	if (dif < min) {
		min = dif;
	}
}
for (int i = 0; i <= m - 2; i++) {
	int dif = abs((y_sum_p[m - 1] - y_sum_p[i]) - y_sum_p[i]);
	if (dif < min) {
		min = dif;
	}
}
```
`x_sum_p[n - 1] - x_sum_p[i]`代表切的那一刀后面的和，`x_sum_p[i]`带表切的那一刀前面的和。