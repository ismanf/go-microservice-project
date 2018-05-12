package main

import (
	"encoding/json"
	"time"

	"github.com/go-redis/redis"
)

type Cache struct {
	Address string
	Enabled bool
	Client  *redis.Client
}

func (c *Cache) getValue(key string) (string, error) {
	if c.Enabled {
		return c.Client.Get(key).Result()
	}
	return "", nil
}

func (c *Cache) setValue(key string, value interface{}) error {
	if c.Enabled {
		val, _ := json.Marshal(value)
		return c.Client.Set(key, val, 0).Err()
	}
	return nil
}

func (c *Cache) NewClient() *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:         c.Address,
		DialTimeout:  10 * time.Second,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		PoolSize:     10,
		PoolTimeout:  30 * time.Second,
	})
}
