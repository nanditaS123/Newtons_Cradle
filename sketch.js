const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;

var ball1,ball2,ball3,ball4,ball5,roof;
var rope1, rope2, rope3, rope4, rope5;
var world;


function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;

	roof = new Roof(width/2,height/4,width/7,20);

	startBobPositionX=widht/2;
	srartBobPositionY=height/4+500;

	bobDiameter=40;

	ball1 = new Bob(startBobPositionX-bobDiameter*2,startBobPositionX,bobDiameter);
	ball2 = new Bob(startBobPositionX-bobDiameter,startBobPositionX,bobDiameter);
	ball3 = new Bob(startBobPositionX,startBobPositionY,bobDiameter);
	ball4 = new Bob(startBobPositionX+bobDiameter,startBobPositionY,bobDiameter);
	ball5 = new Bob(startBobPositionX+bobDiameter*2,startBobPositionY,bobDiameter);


	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: 1200,
			height: 700,
			wireframes: false
		}
	});

	rope1=new Rope(ball1.body, roof.body, -bobDiameter*2,0)
	rope2=new Rope(ball2.body, roof.body, -bobDiameter*1,0)
	rope3=new Rope(ball3.body, roof.body, 0,0)
	rope4=new Rope(ball4.body, roof.body, -bobDiameter*1,0)
	rope5=new Rope(ball5.body, roof.body, -bobDiameter*2,0)

	constraint1={
		bodyA:ball1.body,
		bodyB:roof.body,
		pointB: {x:-bobDiameter*2, y:0}
	}

	constraint2={
		bodyA:ball2.body,
		bodyB:roof.body,		
		pointB: {x:-bobDiameter, y:0}
	}


	constraint3={
		bodyA:ball3.body,
		bodyB:roof.body,		
		pointB: {x:0, y:0}

	}

	constraint4={
		bodyA:ball4.body,
		bodyB:roof.body,		
		pointB: {x:bobDiameter, y:0}	

	}

	constraint5={
		bodyA:ball5.body,
		bodyB:roof.body,		
		pointB: {x:bobDiameter*2, y:0}
	}

	var pendulum1=Constraint.create(constraint1)
	var pendulum2=Constraint.create(constraint2)
	var pendulum3=Constraint.create(constraint3)
	var pendulum4=Constraint.create(constraint4)
	var pendulum5=Constraint.create(constraint5)

	World.add(world, pendulum1);
	World.add(world, pendulum2);
	World.add(world, pendulum3);
	World.add(world, pendulum4);
	World.add(world, pendulum5);
	
	Engine.run(engine);
	Render.run(render);
  
  
}


function draw() {
  rectMode(CENTER);
  background(230);
  roof.display();
  
  ball1.display();
  ball2.display();
  ball3.display();
  ball4.display();
  ball5.display();

  rope1.display();
  rope2.display();
  rope3.display();
  rope4.display();
  rope5.display();
}

function keyPressed() {
	if (keyCode === UP_ARROW){
		Matter.Body.applyForce(ball1.body,ball1.body.position,{x:-50,y:-45};
	}
}

function drawLine(constraint) {

	bobBodyPosition=constraint.bodyA.position
	roofBodyPosition=constraint.bodyB.position

	roofBodyOffset=constraint.pointB;

	roofBodyX=roofBodyPosition.x+roofBodyOffset.x
	roofBodyY=roofBodyPosition.y+roofBodyOffset.y
	line(bobBodyPosition.x, bobBodyPosition.y, roofBodyX, roofBodyY);
}



