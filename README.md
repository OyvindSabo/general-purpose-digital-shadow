# General-Purpose Digital Shadow Application

![Screenshot from 2020-06-29 10-58-00](https://user-images.githubusercontent.com/25663729/85994004-74735e80-b9f7-11ea-9813-d3da65818266.png)

This is a prototype application created as part of my master thesis _Client-side Computing in General-Purpose Digital Shadow Applications_, exploring the possibility of creating general-purpose digital shadows with little or no back-end requirements. This is accomplished by giving users access to a code interface where they can write functions in a domain-specific Lisp-like programming which can safely be evaluated directly in the browser. The user-submitted functions are used to map data from periodic API calls to an array of widget data structures which define lines and surfaces in 2D or 3D space. A widget can also display text or numerical values. Widget objects are automatically translated to nice-looking widgets in a dashboard. If a user wants to share a dashboard, the application is capable of exporting a read-only subset of itself, making it possible to share dashboards which continuously mirror the entity they are modeling.

### Running the application

The application is bundled to a single HTML file and can be found in `dist/index.html`. It relies on hash-based routing, so it does not require any server configuration for routing to work properly. That means that it can be run locally by simply opening `dist/index.html` in Firefox or Chrome.

### Sample use

![Screenshot from 2020-06-29 02-52-23](https://user-images.githubusercontent.com/25663729/85963201-e4142a00-b9b4-11ea-9977-bb5f1dc3374f.png)
This is the Projects overview before any projects have been created. To create a new project, we click _New project_.

![Screenshot from 2020-06-29 02-52-30](https://user-images.githubusercontent.com/25663729/85963211-eaa2a180-b9b4-11ea-8a8e-5d72b3b28119.png)
Clicking _New project_ will create a new project called _Untitled project_. To edit the name of the project, we click _Edit_.

![Screenshot from 2020-06-29 02-52-43](https://user-images.githubusercontent.com/25663729/85963219-f0988280-b9b4-11ea-8f99-f6dabd8a180f.png)
After clicking _Edit_, a new project name can be entered.

![Screenshot from 2020-06-29 02-52-59](https://user-images.githubusercontent.com/25663729/85963249-05751600-b9b5-11ea-90ea-e35640cd1431.png)
The aplication enables us to visualize anything we can think of as 2D and 3D visualization widgets, and makes it easy to display numbers and text. In this example, we will create a dashboard with the salary of some imaginary employees. Therefore, we rename the project to _Employee salaries_ and click save.

![Screenshot from 2020-06-29 02-53-05](https://user-images.githubusercontent.com/25663729/85963253-0a39ca00-b9b5-11ea-97b1-d4e5cd13f0d8.png)
The project now has a new name. To open the project, we click the white box representing the project.

![Screenshot from 2020-06-29 02-53-12](https://user-images.githubusercontent.com/25663729/85963258-1160d800-b9b5-11ea-9e89-312c47a1407a.png)
Opening the project will take us to the _Data sources_ view of the project. The _Data sources_ view is divided into three sections: An input field for entering an API URL, a preview section for previewing data from the API and an input field for entering a fetch interval to determine how often new data should be fetched from the selected data source.

![Screenshot from 2020-06-29 02-53-36](https://user-images.githubusercontent.com/25663729/85963263-19b91300-b9b5-11ea-99ed-2028de4d327c.png)
In this example, I enter the URL http://dummy.restapiexample.com/api/v1/employees, which is a Dummy Rest Api Examle data set containing employee names and salaries.

![Screenshot from 2020-06-29 02-53-48](https://user-images.githubusercontent.com/25663729/85963270-2178b780-b9b5-11ea-94e1-e6238c022968.png)
Clicking Test API URL shows us the response returned from the API. Knowing how the data we are working with looks, makes the next steps much easier. The _Fetch interval_ is set to 0 by default. Typically, the lower the fetch interval is, the more often new data is fetched from the API. However, when the fetch interval is 0, data is fetched only once, but not updated further. This means that we can avoid unnecessary API calls for use-cases where we know that the data will typically not change during a user session. I know that the employee salary data in this example is static, so I leave _Fetch interval_ at 0.

![Screenshot from 2020-06-29 03-29-07](https://user-images.githubusercontent.com/25663729/85964131-c1841000-b9b8-11ea-984b-496cee128b35.png)
Once we have configured the data sources, we can navigate to the _Edit Dashboard dashboard_ view where we have access to a text area where we can write code to define the widgets in our dashboard.

```Clojure
(fun api-response
    (map (fun employee
              { :label (get employee :employee_name)
                :value (get employee :employee_salary) })
         (get api-response :data)))
```

This is the function we will use to map the employee data to salary widgets. It accesses the `data` property of the `api-response` and maps this to an object containing a `label` property and a `value property`.

![Screenshot from 2020-06-29 02-55-22](https://user-images.githubusercontent.com/25663729/85963282-2b9ab600-b9b5-11ea-88d8-65a05074cd4a.png)
Here, the code has been inserted into the text area. Below the text area, the widgets corresponding to the widget objects returned by our function are displayed. Changes made to the code will be immediately reflected in the widgets.

![Screenshot from 2020-06-29 02-55-36](https://user-images.githubusercontent.com/25663729/85963294-35bcb480-b9b5-11ea-938d-edae5c90f222.png)
Also below the text area is a tab called _Raw output_. Here we can preview the data which is returned from the user-submitted function called with the data from the API endpoint we specified in the _Data sources_ view.

![Screenshot from 2020-06-29 02-55-46](https://user-images.githubusercontent.com/25663729/85963306-3e14ef80-b9b5-11ea-9865-b8c95578a4f8.png)
There is also a tab called _Problems_ where runtime errors will be displayed so as to assist users in explaining why their code is failing. In this example there are no problems.

![Screenshot from 2020-06-29 02-56-16](https://user-images.githubusercontent.com/25663729/85963310-466d2a80-b9b5-11ea-88cf-2f84eab9c87c.png)
Once we are satisfied with editing the dashboard widgets code, we can navigate to the _Dashboard_ view. Here, only the dashboard widgets will be displayed, being re-rendered with updated values at the selected fetch intervals, except in our case where we left it at 0.

![Screenshot from 2020-06-29 02-56-36](https://user-images.githubusercontent.com/25663729/85963317-4d943880-b9b5-11ea-86eb-335eeaa54a83.png)
In the top right corner of the screen there is an Export button. Clicking it exports a subset of the application, resembling the current Dashboard view to a single HTML file.

![Screenshot from 2020-06-29 03-00-54](https://user-images.githubusercontent.com/25663729/85963324-52f18300-b9b5-11ea-8a96-abbecdf70361.png)
Opening the exported HTML file in the browser reveals a read-only version of the dashboard we just created. Just like the unexported dashboard, the exported dashboard will continue to fetch data at the specified interval, thus enabling easy sharing of continuously updated documentation.

### Another example

Now that you know how to create a dashboard, here is another example you can try:

**Name:**
Bascule bridge

**API URL:**
https://www.random.org/integers/?num=1&min=1&max=90&col=1&base=10&format=plain&rnd=new

**Fetch interval (s):**
10

**Widgets code:**

```Clojure
(do
  (define
    surfaces
    [{ :color 'rgba(0, 0, 255, 0.5)'
       :points [[-25 0 -75] [25 0 -75] [25 0 75] [-25 0 75]] }
     { :color 'rgba(0, 255, 0, 0.5)'
       :points [[-25 0 75] [-25 0 -75] [-75 5 -75] [-75 5 75]] }
     { :color 'rgba(0, 255, 0, 0.5)'
       :points [[25 0 75] [25 0 -75] [75 5 -75] [75 5 75]] }])
  (define
    get-lines
    (fun
      rotation
      (do
        [{ :color 'brown' :points [[-25 0 -5] [-35 0 -5]] }
         { :color 'brown' :points [[-25 0 5] [-35 0 5]] }
         { :color 'brown' :points [[-25 0 -5] [-25 0 5]] }
         { :color 'brown' :points [[-35 0 -5] [-35 0 5]] }
         { :color 'brown' :points [[-25 5 -5] [-35 5 -5]] }
         { :color 'brown' :points [[-25 5 5] [-35 5 5]] }
         { :color 'brown' :points [[-25 5 -5] [-25 5 5]] }
         { :color 'brown' :points [[-35 5 -5] [-35 5 5]] }
         { :color 'brown' :points [[-35 0 -5] [-35 5 -5]] }
         { :color 'brown' :points [[-35 0 5] [-35 5 5]] }
         { :color 'brown' :points [[-25 0 -5] [-25 5 -5]] }
         { :color 'brown' :points [[-25 0 5] [-25 5 5]] }
         { :color 'brown' :points [[ 25 0 -5] [ 35 0 -5]] }
         { :color 'brown' :points [[25 0 5] [35 0 5]] }
         { :color 'brown' :points [[25 0 -5] [25 0 5]] }
         { :color 'brown' :points [[35 0 -5] [35 0 5]] }
         { :color 'brown' :points [[25 5 -5] [35 5 -5]] }
         { :color 'brown' :points [[25 5 5] [35 5 5]] }
         { :color 'brown' :points [[25 5 -5] [25 5 5]] }
         { :color 'brown' :points [[35 5 -5] [35 5 5]] }
         { :color 'brown' :points [[35 0 -5] [35 5 -5]] }
         { :color 'brown' :points [[35 0 5] [35 5 5]] }
         { :color 'brown' :points [[25 0 -5] [25 5 -5]] }
         { :color 'brown' :points [[25 0 5] [25 5 5]] }
         { :color 'brown' :points [[-25 5 -2.5] [-75 5 -2.5]] }
         { :color 'brown' :points [[-25 5 2.5] [-75 5 2.5]] }
         { :color 'brown' :points [[-75 5 -2.5] [-75 5 2.5]] }
         { :color 'brown'
           :points [[-25 5 -2.5]
                    [(- (* 25 (- 1 (cos rotation))))
                     (+ 5 (* 25 (sin rotation)))
                     -2.5]] }
         { :color 'brown'
           :points [[-25 5 2.5]
                    [(- (* 25 (- 1 (cos rotation))))
                     (+ 5 (* 25 (sin rotation)))
                     2.5]] }
         { :color 'brown'
           :points [[(- (* 25 (- 1 (cos rotation))))
                     (+ 5 (* 25 (sin rotation)))
                     -2.5 ]
                    [(- (* 25 (- 1 (cos rotation))))
                     (+ 5 (* 25 (sin rotation)))
                     2.5]] }
         { :color 'brown' :points [[25 5 -2.5] [75 5 -2.5]] }
         { :color 'brown' :points [[25 5 2.5] [75 5 2.5]] }
         { :color 'brown' :points [[75 5 -2.5] [75 5 2.5]] }
         { :color 'brown'
           :points [[25 5 -2.5]
                    [(* 25 (- 1 (cos rotation)))
                     (+ 5 (* 25 (sin rotation)))
                     -2.5]] }
         { :color 'brown'
           :points [[25 5  2.5]
                    [(* 25 (- 1 (cos rotation)))
                     (+ 5 (* 25 (sin rotation)))
                     2.5]] }
         { :color 'brown'
           :points [[(* 25 (- 1 (cos rotation)))
                     (+ 5 (* 25 (sin rotation)))
                     -2.5]
                    [(* 25 (- 1 (cos rotation)))
                     (+ 5 (* 25 (sin rotation)))
                     2.5]] }
         { :color 'brown'
           :points [[-27.5 5 -2.5] [-27.5 35 -2.5]] }
         { :color 'brown'
           :points [[-27.5 5 2.5] [-27.5 35 2.5]] }
         { :color 'brown'
           :points [[-32.5 5 -2.5] [-32.5 35 -2.5]] }
         { :color 'brown'
           :points [[-32.5 5 2.5] [-32.5 35 2.5]] }
         { :color 'brown'
           :points [[-32.5 30 -2.5] [-32.5 30 2.5]] }
         { :color 'brown'
           :points [[-27.5 30 -2.5] [-27.5 30 2.5]] }
         { :color 'brown'
           :points [[-32.5 35 -2.5] [-32.5 35 2.5]] }
         { :color 'brown'
           :points [[-27.5 35 -2.5] [-27.5 35 2.5]] }
         { :color 'brown' :points [[-27.5 35 -2.5] [-30 45 0]] }
         { :color 'brown' :points [[-27.5 35 2.5] [-30 45 0]] }
         { :color 'brown' :points [[-32.5 35 -2.5] [-30 45 0]] }
         { :color 'brown' :points [[-32.5 35 2.5] [-30 45 0]] }
         { :color 'brown' :points [[27.5 5 -2.5] [27.5 35 -2.5]] }
         { :color 'brown' :points [[27.5 5 2.5] [27.5 35 2.5]] }
         { :color 'brown' :points [[32.5 5 -2.5] [32.5 35 -2.5]] }
         { :color 'brown' :points [[32.5 5 2.5] [32.5 35 2.5]] }
         { :color 'brown' :points [[32.5 30 -2.5] [32.5 30 2.5]] }
         { :color 'brown' :points [[27.5 30 -2.5] [27.5 30 2.5]] }
         { :color 'brown' :points [[32.5 35 -2.5] [32.5 35 2.5]] }
         { :color 'brown' :points [[27.5 35 -2.5] [27.5 35 2.5]] }
         { :color 'brown' :points [[ 27.5 35 -2.5] [30.0 45 0]] }
         { :color 'brown' :points [[ 27.5 35 2.5] [30.0 45 0]] }
         { :color 'brown' :points [[ 32.5 35 -2.5] [30.0 45 0]] }
         { :color 'brown' :points [[ 32.5 35 2.5] [30.0 45 0]] }
         { :color 'brown' :points [[-32.5 30 -2.5] [-75 5 -2.5]] }
         { :color 'brown' :points [[-32.5 30 2.5] [-75 5 2.5]] }
         { :color 'brown'
           :points [[-53.75 17.5 -2.5] [-53.75 5 -2.5]] }
         { :color 'brown'
           :points [[-53.75 17.5 2.5] [-53.75 5 2.5]] }
         { :color 'brown'
           :points [[-64.375 11.25 -2.5] [-64.375 5 -2.5]] }
         { :color 'brown'
           :points [[-64.375 11.25 2.5] [-64.375 5 2.5]] }
         { :color 'brown'
           :points [[-43.125 23.75 -2.5] [-43.125 5 -2.5]] }
         { :color 'brown'
           :points [[-43.125 23.75 2.5] [-43.125 5 2.5]] }
         { :color 'brown' :points [[32.5 30 -2.5] [75 5 -2.5]] }
         { :color 'brown' :points [[32.5 30 2.5] [75 5 2.5]] }
         { :color 'brown'
           :points [[53.75 17.5 -2.5] [53.75 5 -2.5]] }
         { :color 'brown'
           :points [[53.75 17.5 2.5] [53.75 5 2.5]] }
         { :color 'brown'
           :points [[64.375 11.25 -2.5] [64.375 5 -2.5]] }
         { :color 'brown'
           :points [[64.375 11.25 2.5] [64.375 5 2.5]] }
         { :color 'brown'
           :points [[43.125 23.75 -2.5] [43.125 5 -2.5]] }
         { :color 'brown'
           :points [[43.125 23.75 2.5] [43.125 5 2.5]] }
         { :color 'brown'
           :points [[-32.5 35 -2.5] [32.5 35 -2.5]] }
         { :color 'brown' :points [[-32.5 35 2.5] [32.5 35 2.5]] }
         { :color 'brown'
           :points [[-32.5 30 -2.5] [32.5 30 -2.5]] }
         { :color 'brown'
           :points [[-32.5 30 2.5] [32.5 30 2.5]] }])))
    (define center [0 25 0])
    (fun
      rotation-deg
      (do
        (define rotation-rad (* rotation-deg (/ 3.14 180)))
        [{ :label 'Bascule bridge (3D)'
           :is3d true
           :surfaces surfaces
           :lines (get-lines rotation-rad)
           :center center }
         { :label 'Span angle (degrees)' :value rotation-deg }
         { :label 'Span distance (m)'
           :value (* 2
                     (* 25 (- 1 (cos rotation-rad)))) }])))

```

**Result:**
![Screenshot from 2020-06-29 04-26-33](https://user-images.githubusercontent.com/25663729/85966675-ca78df80-b9c0-11ea-94ae-40100087d529.png)

### Building the project

If you make changes to the project, and want these changes to be reflected in the bundled `dist/index.html` file, you can run the following command.

```
$ node build
```

This requires that you have node.js installed.

### Continuously building while developing

While you are developing, it can be cumbersome to have to build the application for each change you make. To automatically continuously build the application, you can run the following command:

```
$ node watch
```
