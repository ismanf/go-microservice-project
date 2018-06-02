package main

import (
	"flag"
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

type DbCongig struct {
	Host string `yaml:"host"`
	Port int    `yaml:"port"`
}

type ServiceConfig struct {
	Addr string `yaml:"addr"`
}

type AMQPConfig struct {
	Url string `yaml:"url"`
}

type AppConfig struct {
	DB   DbCongig      `yaml:"db"`
	SVC  ServiceConfig `yaml:"svc"`
	AMQP AMQPConfig    `yaml:"amqp"`
}

func (c *AppConfig) initializeLocal() error {
	data, err := ioutil.ReadFile("config.yml")
	if err != nil {
		return err
	}
	return yaml.Unmarshal(data, c)
}

func (c *AppConfig) initializeEnv() error {
	return nil
}

var config AppConfig

func initConfig() {
	var fromEnv bool

	flag.BoolVar(
		&fromEnv,
		"from_env",
		false,
		"Enable global config",
	)

	if fromEnv {
		checkError(config.initializeEnv())
		return
	}

	checkError(config.initializeLocal())
}
