package gpio

import(
	"io/ioutil"
	"strconv"
	"os"
	"fmt"
)

const (
	In = true
	Out = false
	High = true
	Low = false
)

type Pin struct {
	N int
}

func (p Pin) Export() error {
	filename := fmt.Sprintf("/sys/class/gpio/gpio%d", p.N)
	if _, err := os.Stat(filename); err != nil {
		err := ioutil.WriteFile("/sys/class/gpio/export", []byte(strconv.Itoa(p.N)), 0)
		if err != nil {
			return fmt.Errorf("can not export gpio%d: %v", p.N, err)
		}
	}
	return nil
}

func (p Pin) Unexport() error {
	err := ioutil.WriteFile("/sys/class/gpio/unexport", []byte(strconv.Itoa(p.N)), 0)
	if err != nil {
		return fmt.Errorf("can not unexport gpio%d: %v", p.N, err)
	}
	return nil
}

func (p Pin) Direction(dir bool) (error) {
	filename := fmt.Sprintf("/sys/class/gpio/gpio%d/direction", p.N)
	data := []byte("out")
	if dir == In {
		data = []byte("in")
	}
	err := ioutil.WriteFile(filename, data, 0)
	if err != nil {
		return fmt.Errorf("can not set gpio%d direction: %v", p.N, err)
	}
	return nil
}

func (p Pin) Read() (bool, error) {
	filename := fmt.Sprintf("/sys/class/gpio/gpio%d/value", p.N)
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return false, fmt.Errorf("can not read gpio%d: %v", p.N, err)
	}
	return len(data) != 0 && data[0] == '1', nil
}

func (p Pin) Write(value bool) (error) {
	filename := fmt.Sprintf("/sys/class/gpio/gpio%d/value", p.N)
	data := []byte("0")
	if value {
		data = []byte("1")
	}
	err := ioutil.WriteFile(filename, data, 0)
	if err != nil {
		return fmt.Errorf("can not write gpio%d: %v", p.N, err)
	}
	return nil
}

func Output(pin int) (Pin, error) {
	g := Pin{pin}
	err := g.Export()
	if err != nil {
		return g, err
	}
	err = g.Direction(Out)
	if err != nil {
		return g, err
	}
	return g, nil
}

func Input(pin int) (Pin, error) {
	g := Pin{pin}
	err := g.Export()
	if err != nil {
		return g, err
	}
	err = g.Direction(In)
	if err != nil {
		return g, err
	}
	return g, nil
}